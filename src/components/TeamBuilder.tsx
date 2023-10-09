import React, { useState } from 'react';
import './TeamBuilder.module.css';
import { useDrop, useDrag } from 'react-dnd';

interface Player {
    id: number;
    name: string;
    position: string;
    rating: number;
    nation: string;
    club: string;
    league: string;
    user: number;
}

interface DroppablePositionProps {
    position: string;
    handleDrop: (player: Player, position: string) => void;
    player: Player | null;
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
        drop: (item: Player) => handleDrop(item, position),
    });

    return (
        <div ref={ref} style={styles.positionBox}>
            {player ? player.name : null}
        </div>
    );
};

const DraggableSuggestedPlayer: React.FC<{ player: Player }> = ({ player }) => {
    const [, ref] = useDrag({
        type: 'PLAYER',
        item: player,
    });

    return <div ref={ref}>{player.name} ({player.position}) </div>;
};

const PlayerSuggestions: React.FC<{ playersInPositions: Record<string, Player | null> }> = ({ playersInPositions }) => {
    const [suggestedPlayers, setSuggestedPlayers] = useState<Player[]>([]);

    const getSuggestions = () => {
        setSuggestedPlayers([]);
        const selectedPlayersData = Object.entries(playersInPositions).map(([selectedPosition, playerData]) => {
            if (!playerData) return null;
            return { player_id: playerData.id, selected_position: selectedPosition };
        }).filter(Boolean);

        fetch('http://127.0.0.1:8000/team_chemistry/suggest_players/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selected_players: selectedPlayersData }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const allSuggestions = [...data.league_suggestions, ...data.nation_suggestions];
                setSuggestedPlayers(allSuggestions);
            });
    };

    return (
        <div>
            <button onClick={getSuggestions}>Get Suggestions</button>
            {suggestedPlayers.map((player) => (
                <DraggableSuggestedPlayer key={player.id} player={player} />
            ))}
        </div>
    );
};

const TeamBuilder: React.FC = () => {
    const positions = ['GK', 'CB1', 'CB2', 'LB', 'RB', 'CM1', 'CM2', 'RM', 'LM', 'ST1', 'ST2'];
    const [playersInPositions, setPlayersInPositions] = useState<Record<string, Player | null>>({});
    const [teamRating, setTeamRating] = useState(0);
    const [teamChemistry, setTeamChemistry] = useState(0);

    const handleDrop = (player: Player, position: string) => {
        setPlayersInPositions((prev) => {
            const updatedPositions = { ...prev, [position]: player };
            const selectedPlayersData = Object.entries(updatedPositions).map(([selectedPosition, playerData]) => {
                if (!playerData) return null;
                return { player_id: playerData.id, selected_position: selectedPosition };
            }).filter(Boolean);

            fetch('http://127.0.0.1:8000/team_chemistry/calculate_chemistry/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selected_players: selectedPlayersData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTeamRating(data.average_rating);
                    setTeamChemistry(data.total_chemistry);
                });

            return updatedPositions;
        });
    };

    return (
        <div>
            <div>
                <p>Team Rating: {teamRating}</p>
                <p>Team Chemistry: {teamChemistry}</p>
            </div>
            <div style={styles.teamArea}>
                {positions.map((pos) => (
                    <div key={pos}>
                        <div>{pos}</div>
                        <DroppablePosition position={pos} handleDrop={handleDrop} player={playersInPositions[pos] || null} />
                    </div>
                ))}
            </div>
            <PlayerSuggestions playersInPositions={playersInPositions} />
        </div>
    );
};

export default TeamBuilder;
