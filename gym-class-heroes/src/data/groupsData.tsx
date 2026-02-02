import type { GroupsInterface } from "../components/interface/groupsInterface";

export const groupData: GroupsInterface[] = [
    {
        id: "A",
        name: "Soccer",
        coachesById: [1],
        athletesById: [1],
        workoutsById: [1]
    },
    {
        id: "B",
        name: "Rugby",
        coachesById: [2],
        athletesById: [2],
        workoutsById: [1, 3]
    },
    {
        id: "C",
        name: "Hockey",
        coachesById: [3],
        athletesById: [3],
        workoutsById: [1, 2, 3]
    }
]