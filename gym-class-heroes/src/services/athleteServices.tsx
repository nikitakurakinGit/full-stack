import * as AthleteRepo from "../apis/athleteRepository";
import type { AthletesInterface } from "../components/interface/athletesInterface";

// FETCH ATHLETES
export async function fetchAthletes(token: string): Promise<AthletesInterface[]> {
  const athletes = await AthleteRepo.fetchAthletes(token);
  return athletes;
}

// VALIDATION HELPERS
export function validateAthleteName(name: string) {
  if (!name.trim()) return "Enter athlete name";
  return null;
}

export function validateExperience(exp: string) {
  const valid = ["Beginner", "Intermediate", "Advanced"];
  if (!valid.includes(exp)) return "Select experience level";
  return null;
}

export function validateStatus(status: string) {
  const valid = ["Active", "Inactive", "Injured"];
  if (!valid.includes(status)) return "Select status";
  return null;
}

export function validateGroup(group: string) {
    if(!group.trim()) return "Select group"
  return null;
}

// DELETE ATHLETE
export async function deleteAthlete(athleteId: number, token:string) {
  console.log("deleteAthlete service ran successfully.")
  return AthleteRepo.deleteAthlete(athleteId, token);
}