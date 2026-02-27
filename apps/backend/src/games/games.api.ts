export const API_BASE_URL = 'https://aoe4world.com/api/v0';

interface GamesResponse {
    games: any[];
}

export async function fetchCurrentGames(profileIds: number[]): Promise<any> {

        // get time 1h30m ago in ISO format
        const since = new Date(Date.now() - 90 * 60 * 1000).toISOString();

        const url = `${API_BASE_URL}/games?since=${since}&profile_ids=${profileIds.join(',')}`;
        console.log(`Fetching current games from URL: ${url}`);

        const allRecentGamesFetch = await (await fetch(url)).json() as GamesResponse;
        
        return allRecentGamesFetch.games;
    } 