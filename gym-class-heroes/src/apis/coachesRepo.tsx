import type { CoachDTO } from "../components/interface/coachDTO";
import type { CoachInterface } from "../components/interface/coachesInterface";
const API_URL = import.meta.env.VITE_API_URL; 


export async function fetchCoaches(token: string): Promise<CoachInterface[]>{
    const res = await fetch(`${API_URL}/coaches`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
    }

    const data: CoachInterface[] = await res.json()
    return data;
}

export async function createCoach({name, title, groupId}: CoachDTO, token: string): Promise<CoachInterface> {
    const res = await fetch(`${API_URL}/coaches`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({name, title, groupId})
    });

    if(!res.ok){
        const error = await res.json()
        throw new Error (error.error)
    }

    const data: CoachInterface = await res.json()
    return data
}

export async function deleteCoach(coachId: number, token: string): Promise<void> {
    console.log(API_URL)
    const res = await fetch(`${API_URL}/coaches/${coachId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.error)
    }
}