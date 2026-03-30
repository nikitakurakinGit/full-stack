export interface CoachInterface {
    id: number;
    name: string;
    title: string;
    groupId: number;
    group: {
        id: number;
        name: string;
    };
}