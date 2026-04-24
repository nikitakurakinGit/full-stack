import * as coachServices from '../apis/coachesRepo';
import type { CoachInterface } from '../components/interface/coachesInterface';

export async function fetchCoaches(token: string): Promise<CoachInterface[]> {
    const coaches = await coachServices.fetchCoaches(token);
    return coaches;
}

export function validateCoachName(name: string) {
    if(!name.trim()) return "Enter coach name";

    return null;
}

export function validateCoachTitle(title: string) {
    if(!title.trim()) return "Enter coach title";

    return null;
}

export function validateGroup(group: string) {
    if(!group.trim()) return "Select group"

    //call groups service. check that group exists

    return null;
}



export async function deleteCoach(coachId: number, token:string) {
    console.log("deleteCoach service ran")
    return coachServices.deleteCoach(coachId, token)
}