import type { CoachInterface } from "../components/interface/coachesInterface";
import { coachData } from "../data/coachData";

export function fetchCoaches(): CoachInterface[]{
    return coachData;
}

export function createCoach({id, name, title, group}: CoachInterface) {
    return coachData.push({id, name, title, group})
}