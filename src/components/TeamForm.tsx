import React, { useState } from 'react';
import './TeamForm.module.css';

const TeamForm: React.FC = () => {
    const [teamName, setTeamName] = useState<string>('');

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            width: '300px',
            marginTop: '20px',
        },
        input: {
            padding: '8px 12px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        }
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitted Team Name: ${teamName}`);
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input
                style={styles.input}
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <button style={styles.button} type="submit">Submit Team</button>
        </form>
    );
}

export default TeamForm;
