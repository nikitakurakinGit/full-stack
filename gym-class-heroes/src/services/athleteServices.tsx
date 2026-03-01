import * as AthleteRepo from "../apis/athleteRepository";
import type { AthletesInterface } from "../components/interface/athletesInterface";

export async function fetchAthletes() {
  const athletes = await AthleteRepo.fetchAthletes();
  return athletes;
}

export function validateAthleteName(name: string) {
  if (!name.trim()) return "Enter athlete name";
  return null;
}

export function validateAthleteSport(sport: string) {
  if (!sport.trim()) return "Enter athlete sport";
  return null;
}

export async function createAthlete(athlete: AthletesInterface) {
  const nameErr = validateAthleteName(athlete.name);
  if (nameErr) return nameErr;

  const sportErr = validateAthleteSport(athlete.sport);
  if (sportErr) return sportErr;

  return AthleteRepo.createAthlete(athlete);
}

export async function deleteAthlete(athleteId: number) {
  return AthleteRepo.deleteAthlete(athleteId);
}
