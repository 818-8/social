import React from 'react';
import { Scenario, Difficulty } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: (scenario: Scenario) => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick }) => {
  const difficultyColor = {
    [Difficulty.EASY]: 'text-green-600 bg-green-100',
    [Difficulty.MEDIUM]: 'text-yellow-600 bg-yellow-100',
    [Difficulty.HARD]: 'text-red-600 bg-red-100',
  };

  return (
    <button
      onClick={() => onClick(scenario)}
      className="flex flex-col text-left bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 hover:border-indigo-200 transition-all duration-200 p-5 group h-full"
    >
      <div className="flex justify-between w-full mb-3">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
          {scenario.emoji}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full h-fit ${difficultyColor[scenario.difficulty]}`}>
          {scenario.difficulty}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{scenario.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2">{scenario.description}</p>
      <div className="mt-auto pt-4">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
          {scenario.category}
        </span>
      </div>
    </button>
  );
};

export default ScenarioCard;