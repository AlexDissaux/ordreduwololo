import Separator from "./Separator";
import Teams from "./Team";
import Player from "./Player";


export default function Stat() {
    
    let showTeam = true;


    return (
        <>
            <Separator/>
            {showTeam ? <Teams/> : <Player/>}
        </>
    )

}