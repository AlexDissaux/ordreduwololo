import { useState } from "react";
import { getPlayer } from "../api/player.service";


export function usePlayers(playerId: string) {
    const [players, setPlayers] = useState<any>([])
    const fetchPlayer = (async() => {
        setPlayers(await getPlayer(playerId))
    })
    fetchPlayer()
    return players;
}