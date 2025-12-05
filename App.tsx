import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ChatScreen from './components/ChatScreen';
import { Scenario } from './types';

function App() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden text-slate-800">
      {activeScenario ? (
        <ChatScreen 
          scenario={activeScenario} 
          onBack={() => setActiveScenario(null)}
          onComplete={() => setActiveScenario(null)}
        />
      ) : (
        <Dashboard onScenarioSelect={setActiveScenario} />
      )}
    </div>
  );
}

export default App;