import React, {useState} from 'react';
import './TeamBuilder.module.css';
import { useDrop } from 'react-dnd';

interface DroppablePositionProps {
    position: string;
    handleDrop: (player: Player, position: string) => void;
    player: Player | null;
}

interface Player {
    name: string;
    [key: string]: any; // Allow other properties as you didn't fully define Player in the given code.
}

const styles = {
    teamArea: {
        display: 'flex',
        flexDirection: 'column' as 'column',
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

const DroppablePosition: React.FC<DroppablePositionProps> = ({ position, handleDrop, player }) => {
    const [, ref] = useDrop({
        accept: 'PLAYER',
        drop: (item: Player) => handleDrop(item, position)
    });

    return (
        <div ref={ref} style={styles.positionBox}>
            {player ? player.name : null}
        </div>
    );
};

const TeamBuilder: React.FC = () => {
    const positions = ['GK', 'CB1', 'CB2', 'LB', 'RB', 'CM1', 'CM2', 'RM', 'LM', 'ST1', 'ST2'];
    const [playersInPositions, setPlayersInPositions] = useState<Record<string, Player | null>>({});

    const handleDrop = (player: Player, position: string) => {
        console.log(`Player ${player.name} dropped at position ${position}`);
        setPlayersInPositions(prev => ({ ...prev, [position]: player }));
        // Further logic...
    };

    return (
        <div style={styles.teamArea}>
            {positions.map(pos => (
                 <div key={pos}>
                 <div>{pos}</div>
                 <DroppablePosition position={pos} handleDrop={handleDrop} player={playersInPositions[pos] || null} />
             </div>
            ))}
        </div>
    );
}

export default TeamBuilder;
;
