import React from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import TeamBuilder from './components/TeamBuilder';

import SubmitTeamForm from './components/SubmitTeamForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css'; // Assuming you might have global styles, if not, you can remove this.

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <Navbar />
      <div className="content">
        <Filters />
        <TeamBuilder />
       
      </div>
    </div>
    </DndProvider>
  );
}

export default App;
