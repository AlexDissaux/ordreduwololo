// Cache to store player data by player ID
const playerCache = new Map<string, any>();



export async function getPlayer(playerId: string): Promise<any> {
    // Check if player data is already in cache
    if (playerCache.has(playerId)) {
        return playerCache.get(playerId)
    }

    // Fetch player data if not in cache
    const playerData = (await fetch(`https://aoe4world.com/api/v0/players/${playerId}`)).json();
    const player = transformPlayerData(playerData);
    
    // Store in cache before returning
    playerCache.set(playerId, player)
    
    return player;
} 


const transformPlayerData = (playerData: any) => {
    if (!playerData.modes.rm_solo) {
        playerData.modes.rm_solo = {
            win_rate: 0,
            wins_count: 0,
            losses_count: 0,
        }
    }
    playerData.modes.rm_solo.win_rate = Number(playerData.modes.rm_solo.win_rate).toFixed(1);
    return playerData;
}

export function getAllPlayer(players: any[], teamName: string, acronyme: string): Promise<any[]> {
    const promises = players.map(async(player) => {
        return {...await getPlayer(player.id),teamName: teamName, acronyme: acronyme, isCap: player.isCap  }
    });

    return Promise.all(promises);
}