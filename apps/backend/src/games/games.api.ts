export const API_BASE_URL = 'https://aoe4world.com/api/v0';

const PROFILE_IDS_BATCH_SIZE = 50;

interface GamesResponse {
    games: any[];
}

export async function fetchCurrentGames(profileIds: number[]): Promise<any> {
    const since = new Date(Date.now() - 90 * 60 * 1000).toISOString();
    const allGames: any[] = [];

    for (let i = 0; i < profileIds.length; i += PROFILE_IDS_BATCH_SIZE) {
        const batch = profileIds.slice(i, i + PROFILE_IDS_BATCH_SIZE);
        const url = `${API_BASE_URL}/games?since=${since}&profile_ids=${batch.join(',')}`;

        const response = await (await fetch(url)).json() as GamesResponse;
        allGames.push(...response.games);
    }

    return allGames;
}