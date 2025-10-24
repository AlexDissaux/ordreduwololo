import { useEffect, useState } from "react";
import { getPlayer } from "../api/player.service";


export function usePlayers(playerId: string) {
    const [players, setPlayers] = useState<any>([])

    useEffect(() =>{
        getPlayer(playerId)
            .then((player: any) => setPlayers([player]));
    }, [playerId])
    return players;
}