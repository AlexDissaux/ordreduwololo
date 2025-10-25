import { usePlayers } from "../hook/usePlayer";
import { teamsNameAndId } from "../db/data.ts"


export default function Player() {


    const allPlayer = getAllPlayer();

    if (allPlayer) {
        return <div>
            {allPlayer.map((player) => (
                player.name
            ))}
        </div>
    } else {
        return <li>Loading....</li>
    }
}

const getAllPlayer = (() => {
    let players = []

    for (const team of teamsNameAndId) {
        for (const player of team.players) {
            players.push(trandformDataForPlayer(player.id))
        }
    }
    players.sort((a, b) => a.modes.rm_solo.win_rate - b.modes.rm_solo.win_rate )
    return players;
})

const trandformDataForPlayer = ((playerId: string) => {
    return usePlayers(playerId)
}) 