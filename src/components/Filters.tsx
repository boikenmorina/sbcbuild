import React, { useState, useEffect } from 'react';
import './Filters.module.css';

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

interface ClubsData {
    [clubName: string]: Player[];
}

interface LeagueData {
    [leagueName: string]: {
        clubs: ClubsData;
    };
}

interface NationsData {
    [nationName: string]: Player[];
}

interface FilteredPlayers {
    leagues: LeagueData;
    nations: NationsData;
}

const Filters: React.FC = () => {
    const [showLeagues, setShowLeagues] = useState(false);
    const [showClubs, setShowClubs] = useState(false);
    const [showNations, setShowNations] = useState(false);

    const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    const [selectedNation, setSelectedNation] = useState<string | null>(null);
    
    const [players, setPlayers] = useState<FilteredPlayers | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/player_search/api/players/data/', {
            method: 'GET',
            credentials: 'include', // This is important for sending the cookie/session
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data received:", data);
                setPlayers(data);
            })
            .catch(error => {
                console.error("Error fetching players:", error);
            });
    }, []);

    return (
        <div>
          {/* Handling Leagues */}
          <button onClick={() => setShowLeagues(!showLeagues)}>Leagues</button>
            {showLeagues && players?.leagues && (
                Object.keys(players.leagues).map(league => (
                    <div key={league}>
                        <button onClick={() => setSelectedLeague(league)}>{league}</button>
                        {selectedLeague === league && Object.keys(players.leagues[league].clubs).map(club => (
                            <div key={club}>
                                <button onClick={() => setSelectedClub(club)}>{club}</button>
                                {selectedClub === club && players.leagues[league].clubs[club].map(player => (
                                    <div key={player.id}>{player.name}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))
            )}

            {/* Handling Nations ...  same as before, no changes needed */}

            {/* Handling Nations */}
            <button onClick={() => setShowNations(!showNations)}>Nations</button>
            {showNations && players?.nations && (
                Object.keys(players.nations).map(nation => (
                    <div key={nation}>
                        <button onClick={() => setSelectedNation(nation)}>{nation}</button>
                        {selectedNation === nation && players.nations[nation].map(player => (
                            <div key={player.id}>{player.name}</div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default Filters;

