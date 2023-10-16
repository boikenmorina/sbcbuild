import React, { useState } from 'react';
import './TeamForm.module.css';



interface SubmitTeamFormProps {
  teamRating: number;
  teamChemistry: number;
  playersInPositions: Record<string, any>;
  clearTeam: () => void; // A function to clear the team in TeamBuilder after submission
}

const SubmitTeamForm: React.FC<SubmitTeamFormProps> = ({ teamRating, teamChemistry, playersInPositions, clearTeam }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create your fetch request here to send the data to the backend
    fetch('http://127.0.0.1:8000/team_chemistry/team_submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName, teamRating, teamChemistry, playersInPositions }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clearTeam(); // Clear the team after successful submission
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter team name"
      />
      <button type="submit">Submit Team</button>
    </form>
  );
};

export default SubmitTeamForm;
