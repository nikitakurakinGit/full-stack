import type { CoachInterface } from "../components/interface/coachesInterface";
import { coachData } from "../data/coachData";

export function fetchCoaches(): CoachInterface[]{
    return coachData;
}

export function createCoach({id, name, title, group}: CoachInterface) {
    const newCoach: CoachInterface = {
        id: id,
        name: name,
        title: title,
        group: group
    }
    
    coachData.push(newCoach)

    return newCoach
}

export function deleteCoach(coachId: number) {
    const index = coachData.findIndex(c => c.id === coachId)

    if(index !== -1) {
        coachData.splice(index, 1)
    }

    return coachId
}