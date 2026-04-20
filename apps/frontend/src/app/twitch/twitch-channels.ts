/** Static list of known French-speaking AoE4 Twitch channels.
 *  Add/remove handles here to keep the page up to date. */
export interface IKnownChannel {
  login: string;
  displayName: string;
}

export const FRENCH_AOE4_CHANNELS: IKnownChannel[] = [
  { login: 'hearttt', displayName: 'HeartT' },
  { login: 'kasva_aoe4', displayName: 'Kasva' },
  { login: 'docbiggz', displayName: 'DocBiggz' },
  { login: 'maelstromeo4', displayName: 'Maelstrom' },
  { login: 'houseofcivilization', displayName: 'HouseOfCivilization' },
  { login: 'cibex', displayName: 'Cibex' },
  { login: 'lacomete_aoe', displayName: 'LaComète' },
];
