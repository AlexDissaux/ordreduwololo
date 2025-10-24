import { usePlayers } from "../hook/usePlayer";


export default function Player({playerId = "22321156-Gam3rLama"}) {
    console.log("in Use player the value is : ")
    console.log(playerId)
    const player = usePlayers(playerId);
    if (player.length) {
        return player[0].modes.rm_solo.rating;
    } else {
        return <li>Loading....</li>
    }
}