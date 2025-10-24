

import { useTeams } from '../hook/useTeams';

export default function Teams() {
    const { teams } = useTeams();

    if (!teams) {
        return <div>Loading teams...</div>;
    }

    // for each team display a title
    // print the player[0].modes.rm_solo.rating for each player
    // return the html :
    return <div>
        {teams.map((team, teamIndex) => (
            <div key={teamIndex} style={{ marginBottom: '30px' }}>
                <h2>{team.name}</h2>
                <div>
                    {team.players.map((player: any, playerIndex: number) => (
                        <div key={playerIndex} style={{ marginBottom: '10px' }}>
                            <span>Player: {player.name || 'Unknown'}</span>
                            {player.modes?.rm_solo?.rating && (
                                <span> - Rating: {player.modes.rm_solo.rating}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
} 