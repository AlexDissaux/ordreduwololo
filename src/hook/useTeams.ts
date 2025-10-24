import { useState, useEffect } from 'react';
import { teamsNameAndId } from "../db/data";
import { getPlayer } from "../api/player.service";

interface Team {
    name: string;
    players: any[];
}

export function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fillTeams = (async() => {
            setTeams(await getAllTeams())
        })
        fillTeams()
    }, [])

    return { teams };
}

async function getAllTeams(): Promise<Team[]> {
    const teams = [];

    for (let team of teamsNameAndId) {
        const playersData = await Promise.all(
            team.players.map(player => getPlayer(player.id))
        );

        teams.push({
            name: team.name,
            players: playersData
        });
    }

    return teams;
}