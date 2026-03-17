import { Logger } from "@nestjs/common";
import { delay } from "../common/utils";

export const API_BASE_URL = 'https://aoe4world.com/api/v0';

const PROFILE_IDS_BATCH_SIZE = 50;

interface GamesResponse {
    games: any[];
}

export async function fetchCurrentGames(profileIds: number[]): Promise<any> {
    const since = new Date(Date.now() - 90 * 60 * 1000).toISOString();
    const allGames: any[] = [];

    for (let i = 0; i < profileIds.length; i += PROFILE_IDS_BATCH_SIZE) {
        await delay(1000); // Add a delay between requests to avoid hitting rate limits
        const batch = profileIds.slice(i, i + PROFILE_IDS_BATCH_SIZE);
        const url = `${API_BASE_URL}/games?since=${since}&profile_ids=${batch.join(',')}`;
        Logger.debug('fetch url: ' + url);
        const response = await (await fetch(url)).json() as GamesResponse;
        allGames.push(...response.games.filter(game => game.ongoing));

        // const res = await fetch(url);
        // if (!res.ok) {
        //     continue;
        // }
        // const text = await res.text();
        // if (!text?.trim()) {
        //     continue;
        // }
        // let response: GamesResponse;
        // try {
        //     response = JSON.parse(text) as GamesResponse;
        // } catch {
        //     continue;
        // }
        // if (response.games) {
        //     allGames.push(...response.games.filter(game => game.ongoing));
        // }
    }

    return allGames;
}