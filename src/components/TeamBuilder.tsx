import React from 'react';
import './TeamBuilder.module.css';

const TeamBuilder: React.FC = () => {
    const positions = ['GK: Martinez', 'CB: Varane', 'CB', 'LB : Mendy', 'RB: Clauss','CM','CM','RM', 'LM','ST: Mbappe', 'ST: Payet', ];

    const styles = {
        teamArea: {
            display: 'flex',
            flexDirection: 'column' as 'column', // Cast this as 'column'
            alignItems: 'center',
            backgroundColor: 'green',
            width: '300px',
            minHeight: '500px',
            padding: '20px 0',
        },
        positionBox: {
            width: '80%',
            height: '40px',
            marginBottom: '10px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
    

    return (
        <div style={styles.teamArea}>
            {positions.map(pos => (
                <div key={pos} style={styles.positionBox} draggable={true}>
                    {pos}
                </div>
            ))}
        </div>
    );
}

export default TeamBuilder;
