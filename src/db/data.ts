export type TeamsNameAndId = {
    name: string,
    points: number;
    acronyme: string,
    players : Array<{id: string, isCap? : boolean}>
}

export const sinceDate = '2025/11/01'


export const teamsNameAndId: TeamsNameAndId[] = [
    {    
        name: "Team du turfu",
        points: 0,
        acronyme: "TDT",
        players : [
            {id: "1712108"},
            {id: "8275065", isCap: true},
            {id: "7219954"},
            {id: "11575115"},
            {id: "19206930"}
        ]
    },
    {    
        name: "Team du tard l'époque",
        points: 0,
        acronyme: "TDTL",
        players : [
            {id: "15289018", isCap: true},
            {id: "3367604"},
            {id: "15624724"},
            {id: "23160801"},
            {id: "358437"}
        ]
    },
    {    
        name: "Team du moment présent",
        points: 0,
        acronyme: "TDMP",
        players : [
            {id: "8250217", isCap: true},
            {id: "12170036"},
            {id: "20304572"},
            {id: "18798505"},
            {id: "22819911"}
        ]
    }
]