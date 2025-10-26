import { useState } from "react";
import Separator from "./Separator";
import Teams from "./Team";
import Player from "./Player";


export default function Stat() {
    const [showTeam, setShowTeam] = useState(true);

    return (
        <>
            <Separator showTeam={showTeam} onToggle={setShowTeam} />
            {showTeam ? <Teams/> : <Player/>}
        </>
    )

}