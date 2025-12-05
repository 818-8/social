import React, { useState, useEffect, useRef } from 'react';
import { Scenario, Message, MessageRole } from '../types';
import { generateReply, getCoachFeedback } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import { ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';

interface ChatScreenProps {
  scenario: Scenario;
  onBack: () => void;
  onComplete: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ scenario, onBack, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize scenario
  useEffect(() => {
    const initialMessage: Message = {
      id: 'init-1',
      role: MessageRole.MODEL,
      text: scenario.aiFirstMessage,
    };
    setMessages([initialMessage]);
  }, [scenario]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isAnalyzing]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: userText,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // 1. Get AI Persona Reply
      const replyText = await generateReply(scenario, updatedMessages);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: replyText,
      };

      setMessages(prev => [...prev, aiMsg]);

      // 2. Get Coach Feedback (Optional: could be triggered manually, but doing it auto for "Coach" feel)
      setIsAnalyzing(true);
      const feedback = await getCoachFeedback(scenario, userText, updatedMessages);
      
      const feedbackMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: MessageRole.SYSTEM,
        text: feedback,
      };
      
      setIsAnalyzing(false);
      setMessages(prev => {
        return [...prev, feedbackMsg];
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span>{scenario.emoji}</span>
            {scenario.title}
          </h2>
          <p className="text-xs text-slate-500">{scenario.category} • {scenario.difficulty}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
        <div className="max-w-3xl mx-auto">
            {/* Scenario Context Card */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 text-sm text-indigo-900">
                <span className="font-bold block mb-1">🎯 目标：</span>
                {scenario.description}
            </div>

            {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
            <div className="flex justify-start mb-4">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                   <span className="text-xs text-slate-400">对方正在输入...</span>
                </div>
            </div>
            )}

            {isAnalyzing && !isLoading && (
                 <div className="flex justify-center mb-4">
                    <div className="text-xs text-amber-600 flex items-center gap-1 animate-pulse">
                        <Sparkles size={12} /> 教练正在分析...
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 absolute bottom-0 w-full">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的回复..."
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 disabled:opacity-50 outline-none transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white p-3 rounded-lg transition-colors flex items-center justify-center w-12 h-12"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;