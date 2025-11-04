export type TeamsNameAndId = {
    name: string,
    points: number;
    acronyme: string,
    players : Array<{id: string, isCap? : boolean}>
}

export const sinceDate = '2025/09/01'


export const teamsNameAndId: TeamsNameAndId[] = [
    {    
        name: "Equipe 1",
        points: 0,
        acronyme: "Eq1",
        players : [
            {id: "20391264", isCap : true}, // LeBigl
            {id: "8953699", isCap : false}, // Ours
            {id: "17594012", isCap : false}, // Rod
            {id: "1432106", isCap : false}, // Cjee
            {id: "10605002", isCap : false}, // Val
        ]
    },
    {    
        name: "Equipe 2",
        points: 0,
        acronyme: "Eq2",
        players : [
            {id: "20704115", isCap : true}, // Manishax_Calni
            {id: "9254518", isCap : false}, // Caius
            {id: "1365135", isCap : false}, // La_CAF
            {id: "5556271", isCap : false}, // Joepescie
            {id: "22658829", isCap : false}, // Eleva
        ]
    },
    {    
        name: "Equipe 3",
        points: 0,
        acronyme: "Eq3",
        players : [
            {id: "12029658", isCap : true}, // Alyce
            {id: "4314006", isCap : false}, // Raptor
            {id: "6732245", isCap : false}, // Xelkara
            {id: "790039", isCap : false}, // Marin_Deaudouce
            {id: "1421448", isCap : false}, // Xelforce
        ]
    },
    {    
        name: "Equipe 4",
        points: 0,
        acronyme: "Eq4",
        players : [
            {id: "23866592", isCap : true}, // Druss
            {id: "21796931", isCap : false}, // Totox
            {id: "12170036", isCap : false}, // Vox
            {id: "8989366", isCap : false}, // Mascro
            {id: "15012300", isCap : false}, // Oulala
        ]
    },
    {    
        name: "Equipe 5",
        points: 0,
        acronyme: "Eq5",
        players : [
            {id: "2866310", isCap : true}, // Monster
            {id: "7319091", isCap : false}, // Slender
            {id: "8250217", isCap : false}, // Bulky
            {id: "1947541", isCap : false}, // Rellik
            {id: "14400153", isCap : false}, // The_Vegas
        ]
    },
    {    
        name: "Equipe 6",
        points: 0,
        acronyme: "Eq6",
        players : [
            {id: "358437", isCap : true}, // Epiviosi
            {id: "9754661", isCap : false}, // The_Tost
            {id: "8275065", isCap : false}, // Bucéphale
            {id: "6550325", isCap : false}, // Bob
            {id: "22598716", isCap : false}, // Vegeta
        ]
    },
    {    
        name: "Equipe 7",
        points: 0,
        acronyme: "Eq7",
        players : [
            {id: "23160801", isCap : true}, // Firefooxs
            {id: "15624724", isCap : false}, // Stay_Frosty
            {id: "15289018", isCap : false}, // Tarlanors
            {id: "1712108", isCap : false}, // Trakor
            {id: "11575115", isCap : false}, // Coco
        ]
    },
    {    
        name: "Equipe 8",
        points: 0,
        acronyme: "Eq8",
        players : [
            {id: "19206930", isCap : true}, // Cosmos
            {id: "18963110", isCap : false}, // Rollos
            {id: "23800459", isCap : false}, // nicolas
        ]
    }
]