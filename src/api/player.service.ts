export async function getPlayer(playerId: string): Promise<any> {
    const response = await fetch(`https://aoe4world.com/api/v0/players/${playerId}`);
    const playerdata = await response.json();
    playerdata.modes.rm_solo.win_rate = Number(playerdata.modes.rm_solo.win_rate).toFixed(1);
    return playerdata;
} 


export function getAllPlayer(players: any[], teamName: string, acronyme: string): Promise<any[]> {
    const promises = players.map(async(player) => {
        return {...await getPlayer(player.id),teamName: teamName, acronyme: acronyme  }
    });

    return Promise.all(promises);
}