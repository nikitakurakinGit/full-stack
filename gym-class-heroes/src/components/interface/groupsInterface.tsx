export interface GroupsInterface {
    id: number;
    name: string;
    coach: {
        id: number;
        name: string;
        title: string;
    } | null;
    athletes: {
        id: number;
        name: string;
        sport: string;
        experience: string;
        status: string;
    }[];
    workouts: {
        id: number;
        workout: string;
    }[];
}