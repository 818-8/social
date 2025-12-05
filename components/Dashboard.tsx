import React, { useEffect, useState } from 'react';
import { SCENARIOS } from '../constants';
import { Scenario } from '../types';
import ScenarioCard from './ScenarioCard';
import { getDailyTip } from '../services/geminiService';
import { MessageSquare, Trophy, Zap } from 'lucide-react';

interface DashboardProps {
  onScenarioSelect: (scenario: Scenario) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onScenarioSelect }) => {
  const [tip, setTip] = useState<string>("正在加载每日智慧...");

  useEffect(() => {
    getDailyTip().then(setTip);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Social<span className="text-indigo-600">Dojo</span> 社交道场
          </h1>
          <p className="text-slate-500 text-lg mb-6">拥有你的专属 AI 教练，掌握谈话的艺术。</p>
          
          {/* Daily Tip Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg flex items-start gap-4 transition-all duration-300">
             <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                <Zap className="w-6 h-6 text-yellow-300" />
             </div>
             <div>
                 <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-100 mb-1">每日洞察</h3>
                 <p className="font-medium text-lg leading-snug break-words">
                   {/* Automatically remove quotes if API adds them, then add our own styled ones if needed, or just display text */}
                   {tip.replace(/^['"]|['"]$/g, '')}
                 </p>
             </div>
          </div>
        </div>
      </div>

      {/* Stats (Mock) */}
      <div className="max-w-5xl mx-auto w-full px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full flex-shrink-0">
                <MessageSquare size={18} />
            </div>
            <div>
                <div className="text-2xl font-bold text-slate-800">12</div>
                <div className="text-xs text-slate-500">完成对话</div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-full flex-shrink-0">
                <Trophy size={18} />
            </div>
            <div>
                <div className="text-2xl font-bold text-slate-800">4</div>
                <div className="text-xs text-slate-500">掌握等级</div>
            </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="max-w-5xl mx-auto w-full px-6 pb-12 flex-1">
        <h2 className="text-xl font-bold text-slate-800 mb-6">选择一个场景</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map((scenario) => (
            <ScenarioCard 
              key={scenario.id} 
              scenario={scenario} 
              onClick={onScenarioSelect} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;