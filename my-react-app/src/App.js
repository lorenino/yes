import React from 'react';
import CreateTache from './Components/CreateTache';
import TachesList from './Components/TachesList';
import RecurrenceManager from './Components/RecurrenceManager';
import SujetManager from './Components/SujetManager';

function App() {
  return (
    <div className="App">
      <h1>Dashboard de Création de Tâches</h1>
      <CreateTache />
      <TachesList />
      <RecurrenceManager />
      <SujetManager />
    </div>
  );
}

export default App;
