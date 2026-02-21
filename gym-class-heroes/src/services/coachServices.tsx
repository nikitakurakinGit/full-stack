import * as coachServices from '../apis/coachesRepo';
import type { CoachInterface } from '../components/interface/coachesInterface';

export async function fetchCoaches() {
    const coaches = await coachServices.fetchCoaches();
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

export function createCoach({name, title, group}: CoachInterface) {
    const emplId: number = Math.floor(1000 + Math.random() * 9000)
    
    const nameErr = validateCoachName(name);
    if(nameErr) return nameErr;

    const titleErr = validateCoachTitle(title);
    if(titleErr) return titleErr;

    const groupErr = validateGroup(group);
    if(groupErr) return groupErr;

    const newCoach: CoachInterface = {
        id: emplId,
        name: name,
        title: title,
        group: group
    }

    return coachServices.createCoach(newCoach)
}