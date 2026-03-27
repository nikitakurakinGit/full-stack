import type { AthleteDTO } from "../components/interface/athleteDTO";
import type { AthletesInterface } from "../components/interface/athletesInterface";
const API_URL = import.meta.env.VITE_API_URL;

// GET all athletes
export async function fetchAthletes(): Promise<AthletesInterface[]> {
  const res = await fetch(`${API_URL}/athletes`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch athletes");
  }

  const data: AthletesInterface[] = await res.json();
  return data;
}

// CREATE athlete
export async function createAthlete({ name, experience, status, groupId }: AthleteDTO) {
  const res = await fetch(`${API_URL}/athletes`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ name, experience, status, groupId })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return await res.json();
}

// DELETE athlete
export async function deleteAthlete(athleteId: number): Promise<void> {
  const res = await fetch(`${API_URL}/athletes/${athleteId}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete athlete");
  }
}