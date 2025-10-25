export interface TeamsNameAndId {
    name: string,
    acronyme: string,
    players : Array<{id: string}>
}


export const teamsNameAndId: TeamsNameAndId[] = [
    {    
        name: "Team du turfu",
        acronyme: "TDT",
        players : [
            {id: "1712108"},
            {id: "8275065"},
            {id: "7219954"},
            {id: "11575115"},
            {id: "19206930"}
        ]
    },
    {    
        name: "Team du tard l'époque",
        acronyme: "TDTL",
        players : [
            {id: "15289018"},
            {id: "3367604"},
            {id: "7219954"},
            {id: "23160801"},
            {id: "358437"}
        ]
    },
    {    
        name: "Team du moment présent",
        acronyme: "TDMP",
        players : [
            {id: "15289018"},
            {id: "3367604"},
            {id: "1712108"},
            {id: "23160801"},
            {id: "19206930"}
        ]
    }
]