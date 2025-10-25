import { teamsNameAndId } from "../db/data";
import { getPlayer } from "./player.service"



export interface Team {
    name: string;
    players: any[];
    teamWinrate : TeamWinrate;
}

export interface TeamWinrate {
    win: number;
    lose: number;
    winRate: number;
}



export async function getAllTeams(): Promise<Team[]> {
    const teams = [];

    for (let team of teamsNameAndId) {
        const playersData = await Promise.all(
            team.players.map(player => getPlayer(player.id))
        );
        

        teams.push({
            name: team.name,
            players: playersData,
            teamWinrate: computeTeamWinrate(playersData)
        });
    }

    // sorting teams by winrate (highest first)
    teams.sort((a, b) => b.teamWinrate.winRate - a.teamWinrate.winRate);

    return teams;
}

const computeTeamWinrate = (playersData: any[]): TeamWinrate => {
    const totalWins = playersData.reduce((sum, player) => sum + player.modes.rm_solo.wins_count, 0);
    const totalLosses = playersData.reduce((sum, player) => sum + player.modes.rm_solo.losses_count, 0);
    const totalGames = totalWins + totalLosses;
    const winRate = totalGames > 0 ? Number(((totalWins / totalGames) * 100).toFixed(1)) : 0;

    return {
        win: totalWins,
        lose: totalLosses,
        winRate: winRate
    };
}