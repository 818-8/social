import { GoogleGenAI, Type } from "@google/genai";
import { Message, MessageRole, Scenario } from "../types";

// NOTE: In a production app, the API key should be handled securely via a backend proxy.
// For this frontend-only demo, we use the environment variable directly.
const apiKey = process.env.API_KEY;

// Helper to get the AI instance
const getAI = () => {
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  // Initialize with apiKey and optional baseUrl (for proxies)
  return new GoogleGenAI({ 
    apiKey,
    baseUrl: process.env.API_BASE_URL || undefined
  });
};

export const generateReply = async (
  scenario: Scenario,
  messageHistory: Message[]
): Promise<string> => {
  const ai = getAI();
  
  // Construct the conversation history for the model
  const chatHistory = messageHistory
    .filter(m => m.role !== MessageRole.SYSTEM)
    .map(m => `${m.role === MessageRole.USER ? 'User' : 'Character'}: ${m.text}`)
    .join('\n');

  const systemInstruction = `
    Scenario: ${scenario.description}
    Your Role: ${scenario.initialPrompt}
    
    Task: Reply to the user's last message naturally as your character. 
    Keep responses realistic and concise (under 60 words unless the persona is talkative).
    Language: Chinese (Mandarin). Use colloquialisms where appropriate for the role.
    Do NOT break character.
  `;

  const prompt = `
    ${systemInstruction}

    Conversation History:
    ${chatHistory}

    Character:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "...";
  } catch (error) {
    console.error("Error generating reply:", error);
    return "我现在有点思路卡壳了，请稍等...";
  }
};

export const getCoachFeedback = async (
  scenario: Scenario,
  lastUserMessage: string,
  contextMessages: Message[]
): Promise<string> => {
  const ai = getAI();

  // Get only the last few messages for context
  const recentHistory = contextMessages
    .slice(-4) 
    .filter(m => m.role !== MessageRole.SYSTEM)
    .map(m => `${m.role}: ${m.text}`)
    .join('\n');

  const prompt = `
    You are a world-class communication coach giving feedback in Chinese.
    
    Scenario Context: ${scenario.title} - ${scenario.description}
    Coach Instruction: ${scenario.coachInstruction}
    
    Recent Conversation:
    ${recentHistory}
    
    The User just said: "${lastUserMessage}"
    
    Task: Provide a very brief (max 2 sentences) critique or tip on what they did well or could improve in that specific message. Be constructive and encouraging.
    Output Language: Chinese (Simplified).
    Output JSON format: { "feedback": "string" }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                feedback: { type: Type.STRING }
            }
        }
      }
    });
    
    const json = JSON.parse(response.text || "{}");
    return json.feedback || "做得不错！继续保持。";
  } catch (error) {
    console.error("Error getting feedback:", error);
    return "继续加油！你做得很好。";
  }
};

export const getDailyTip = async (): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Provide one short, actionable social skill tip in Simplified Chinese (max 20 characters). Output ONLY the Chinese text. Do NOT include Pinyin, English translation, or Markdown formatting.",
        });
        // Remove any accidental quotes or whitespace
        const text = response.text || "多倾听，少说话。";
        return text.replace(/['"]/g, '').trim();
    } catch (e) {
        return "微笑是最好的名片。";
    }
}