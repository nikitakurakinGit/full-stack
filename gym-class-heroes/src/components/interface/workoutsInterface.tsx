export interface WorkoutsInterface {
    id: number;
    workout: string[];
    groupId: number;
    group:{
        id: number;
        name: string;
    } 
}