import React from 'react';
import { Message, MessageRole } from '../types';
import { User, Bot, Sparkles, AlertTriangle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM;

  if (isSystem) {
    const isError = message.text.includes("错误") || message.text.includes("Error");
    
    return (
      <div className="flex justify-center my-4 animate-fade-in">
        <div className={`
          text-sm px-4 py-2 rounded-lg flex items-start gap-2 max-w-xs md:max-w-md shadow-sm
          ${isError 
            ? 'bg-red-50 border border-red-200 text-red-800' 
            : 'bg-amber-50 border border-amber-200 text-amber-800'
          }
        `}>
          {isError ? (
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
          ) : (
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          )}
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col">
            <div
            className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                isUser
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}
            >
            {message.text}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;