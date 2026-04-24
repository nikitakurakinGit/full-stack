import type { AthleteDTO } from "../components/interface/athleteDTO";
import type { AthletesInterface } from "../components/interface/athletesInterface";
const API_URL = import.meta.env.VITE_API_URL;


export async function fetchAthletes(token: string): Promise<AthletesInterface[]> {
    const res = await fetch(`${API_URL}/athletes`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
    }

    const data: AthletesInterface[] = await res.json()
    return data;
}

// CREATE athlete
export async function createAthlete({ name, experience, status, groupId }: AthleteDTO, token: string) {
  const res = await fetch(`${API_URL}/athletes`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, experience, status, groupId })
  });

    if(!res.ok){
        const error = await res.json()
        throw new Error (error.error)
    }

    const data: AthletesInterface = await res.json()
    return data
}

// DELETE athlete
export async function deleteAthlete(athleteId: number, token: string): Promise<void> {
    console.log(API_URL)
    const res = await fetch(`${API_URL}/athletes/${athleteId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!res.ok){
        const error = await res.json()
        throw new Error (error.error)
    }
}