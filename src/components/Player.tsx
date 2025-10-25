import { usePlayers } from "../hook/usePlayers";


export default function Player() {
    const { players } = usePlayers()

    if (!players) {
        return <div>Loading....</div>
    }

    return (
        <div>
            {players.map((player, index) => (
                <div key={index}>{player.name} {player.teamName} {player.acronyme} {player.modes.rm_solo.wins_count} {player.modes.rm_solo.losses_count} {player.modes.rm_solo.win_rate}%</div>
            ))}
        </div>
    )
} 