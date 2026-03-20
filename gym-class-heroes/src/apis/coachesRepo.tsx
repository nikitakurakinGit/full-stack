import type { CoachDTO } from "../components/interface/coachDTO";
import type { CoachInterface } from "../components/interface/coachesInterface";
const API_URL = import.meta.env.VITE_API_URL; 


export async function fetchCoaches(): Promise<CoachInterface[]>{
    const res = await fetch(`${API_URL}/coaches`)

    const data: CoachInterface[] = await res.json()

    return data;
}

export async function createCoach({name, title, group}: CoachDTO): Promise<CoachInterface> {
    const res = await fetch(`${API_URL}/coaches`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({name, title, group})
    });

    if(!res.ok){
        const error = await res.json()
        throw new Error (error.error)
    }

    const data: CoachInterface = await res.json()
    return data
}

export async function deleteCoach(coachId: number): Promise<void> {
    const res = await fetch(`${API_URL}/coaches/${coachId}`, {
        method: "DELETE"
    });

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.error)
    }
}