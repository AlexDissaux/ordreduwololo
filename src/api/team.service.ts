import { teamsNameAndId } from "../db/data";
import { getPlayer } from "./player.service"



export interface Team {
    name: string;
    players: any[];
    teamWinrate : TeamWinrate;
    totalGames: number;
    bestMmrChange: number;
    totalCivDiversity: number;
    rankingPoints: number;
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
            team.players.map(async (player) => {
                return {...await getPlayer(player.id), isCap: player.isCap}}
            )
        );
        
        const teamWinrate = computeTeamWinrate(playersData);
        const bestMmrChange = getBestMmrChange(playersData);
        const totalCivDiversity = getTotalCivDiversity(playersData);
        teams.push({
            name: team.name,
            players: playersData,
            teamWinrate: teamWinrate,
            totalGames: teamWinrate.win + teamWinrate.lose,
            bestMmrChange: bestMmrChange,
            totalCivDiversity: totalCivDiversity,
            rankingPoints: 0 // sera calculé après
        });
    }

    // Calculer les points de classement
    calculateRankingPoints(teams);

    // Trier les équipes par points de classement (du plus haut au plus bas)
    teams.sort((a, b) => b.rankingPoints - a.rankingPoints);

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

const getBestMmrChange = (playersData: any[]): number => {
    // Trouve le meilleur mmrChange parmi tous les joueurs de l'équipe
    const bestChange = Math.max(...playersData.map(player => player.modes.rm_solo.mmrChange || 0));
    return bestChange;
}

const getTotalCivDiversity = (playersData: any[]): number => {
    // Additionne le nombre de civilisations différentes jouées par chaque joueur de l'équipe
    const totalCivs = playersData.reduce((sum, player) => sum + (player.modes.rm_solo.nombreCivDiffJouer || 0), 0);
    return totalCivs;
}

const calculateRankingPoints = (teams: any[]) => {
    const numberOfTeams = teams.length;
    
    // Classement par winrate
    const teamsByWinrate = [...teams].sort((a, b) => b.teamWinrate.winRate - a.teamWinrate.winRate);
    teamsByWinrate.forEach((team, index) => {
        team.rankingPoints += numberOfTeams - index;
    });
    
    // Classement par nombre de parties
    const teamsByGames = [...teams].sort((a, b) => b.totalGames - a.totalGames);
    teamsByGames.forEach((team, index) => {
        team.rankingPoints += numberOfTeams - index;
    });
    
    // Classement par meilleur MMR change
    const teamsByMmrChange = [...teams].sort((a, b) => b.bestMmrChange - a.bestMmrChange);
    teamsByMmrChange.forEach((team, index) => {
        team.rankingPoints += numberOfTeams - index;
    });
    
    // Classement par diversité de civilisations
    const teamsByCivDiversity = [...teams].sort((a, b) => b.totalCivDiversity - a.totalCivDiversity);
    teamsByCivDiversity.forEach((team, index) => {
        team.rankingPoints += numberOfTeams - index;
    });
}