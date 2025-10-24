export async function getPlayer(playerId: string): Promise<any> {
    const response = await fetch(`https://aoe4world.com/api/v0/players/${playerId}`);
    return await response.json();;
} 
