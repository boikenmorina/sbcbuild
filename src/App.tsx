import React from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import TeamBuilder from './components/TeamBuilder';
import SuggestedPlayers from './components/SuggestedPlayers';
import TeamForm from './components/TeamForm';
import './App.css'; // Assuming you might have global styles, if not, you can remove this.

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Filters />
        <TeamBuilder />
        <SuggestedPlayers />
        <TeamForm />
      </div>
    </div>
  );
}

export default App;
