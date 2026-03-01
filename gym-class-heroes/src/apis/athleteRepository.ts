import { athleteData } from "../data/athleteData";
import type { AthletesInterface } from "../components/interface/athletesInterface";

// Get all athletes
export function fetchAthletes(): AthletesInterface[] {
  return athleteData;
}

// Get athlete by ID
export function getAthleteById(id: number): AthletesInterface {
  const foundAthlete = athleteData.find(athlete => athlete.id === id);

  if (!foundAthlete) {
    throw new Error(`Failed to fetch athlete with id ${id}`);
  }

  return foundAthlete;
}

// Create a new athlete
export function createAthlete({ id, name, sport, experience, status }: AthletesInterface) {
  const newAthlete: AthletesInterface = {
      id: id,
      name: name,
      sport: sport,
      experience: experience,
      status: status
  };

  athleteData.push(newAthlete);

  return newAthlete;
}

// Update an existing athlete
export function updateAthlete(
    updatedAthlete: AthletesInterface
): AthletesInterface {
    const index = athleteData.findIndex(athlete => athlete.id === updatedAthlete.id);

    if (index === -1) {
        throw new Error(`Failed to update athlete with id ${updatedAthlete.id}`);
    }

    athleteData[index] = updatedAthlete;
    return athleteData[index];
}

// Delete an athlete
export function deleteAthlete(id: number): boolean {
    const index = athleteData.findIndex(athlete => athlete.id === id);

    if (index === -1) {
        throw new Error(`Failed to delete athlete with id ${id}`);
    }

    athleteData.splice(index, 1);
    return true;
}
