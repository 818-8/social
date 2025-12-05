export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system' // For coach tips
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  feedback?: string; // Analysis of this specific message
}

export enum Difficulty {
  EASY = '简单',
  MEDIUM = '中等',
  HARD = '困难'
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: Difficulty;
  category: string;
  initialPrompt: string; // Internal prompt to set the AI persona
  aiFirstMessage: string; // What the AI says to start
  coachInstruction: string; // Instructions for the feedback analyzer
}

export interface UserStats {
  scenariosCompleted: number;
  totalMessages: number;
  streakDays: number;
}