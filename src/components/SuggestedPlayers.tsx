import React from 'react';

const SuggestedPlayers: React.FC = () => {
    const players = [
        {name: 'Messi', rating: 92},
        {name: 'Kimpembe', rating: 86},
        {name: 'Kolo Muani', rating: 81},
        // ... add more players as required
    ];

    const styles = {
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: '1px solid #ddd',
        },
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
        <div>
            {/* Header section with Chemistry and Rating */}
            <div style={styles.headerContainer}>
                <div>Chemistry: 15</div>
                <div>Rating: 51</div>
            </div>

            {/* Players list */}
            <div style={styles.container}>
                {players.map(player => (
                    <div key={player.name} style={styles.player}>
                        <strong>{player.name}</strong>
                        <div>Rating: {player.rating}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestedPlayers;