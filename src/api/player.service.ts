import { sinceDate } from "../db/data";

// Cache to store player data by player ID
const playerCache = new Map<string, any>();

export async function getPlayer(playerId: string): Promise<any> {
    // Check if player data is already in cache
    if (playerCache.has(playerId)) {
        return playerCache.get(playerId)
    }

    // Fetch player data if not in cache
    
    const playerData = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}`)).json();
    const player = transformPlayerData(playerData, playerId);
    
    // Store in cache before returning
    playerCache.set(playerId, player)
    
    return player;
} 


const transformPlayerData = async (playerData: any, playerId: string) => {
    const playerGamesPage1 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=1`)).json();
    if (!playerData.modes) playerData.modes = {}

    if (playerGamesPage1.total_count === 0) {
        playerData.modes.rm_solo = {
            win_rate: 0,
            wins_count: 0,
            losses_count: 0,
        }
    } else {
        let games = playerGamesPage1.games;
        if (playerGamesPage1.total_count > 50) {
            const playerGamesPage2 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=2`)).json();
            games.push(...playerGamesPage2.games)
        }
        if (playerGamesPage1.total_count > 100) {
            const playerGamesPage3 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=3`)).json();
            games.push(...playerGamesPage3.games)
        }
        const [wins, losses] = games.reduce(([wins, losses]: [number, number], game: any): [number, number] => {
            // console.log(game.teams)
            const teamOdwPlayer = game.teams.find((players: any) => {
                // console.log("playerId : " + playerId)
                // console.log(players[0].player.profile_id)
                return players[0].player.profile_id == playerId
            })
            // console.log(teamOdwPlayer)
            const odwPlayer = teamOdwPlayer[0].player

            if (odwPlayer.result == "win") {
                return [wins + 1, losses]
            } else {
                return [wins, losses + 1]
            }
        }, [0, 0])

        playerData.modes.rm_solo = {
            win_rate: (wins / (wins + losses)) * 100,
            wins_count: wins,
            losses_count: losses,
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