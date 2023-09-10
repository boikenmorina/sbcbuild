import React from 'react';

const SuggestedPlayers: React.FC = () => {
    const players = [
        {name: 'Messi', rating: 92},
        {name: 'Ronaldo', rating: 92},
        {name: 'Diaz', rating: 86},
        // ... add more players as required
    ];

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '20px',
            borderTop: '1px solid #ddd',
            marginTop: '20px',
        },
        player: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        }
    };

    return (
        <div style={styles.container}>
            {players.map(player => (
                <div key={player.name} style={styles.player}>
                    <strong>{player.name}</strong>
                    <div>Rating: {player.rating}</div>
                    
                </div>
            ))}
        </div>
    );
}

export default SuggestedPlayers;
