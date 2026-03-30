import * as AthleteRepo from "../apis/athleteRepository";
import type { AthletesInterface } from "../components/interface/athletesInterface";

// FETCH ATHLETES
export async function fetchAthletes(): Promise<AthletesInterface[]> {
  const athletes = await AthleteRepo.fetchAthletes();
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

export function validateGroupId(groupId: number) {
  if (!groupId || isNaN(groupId)) return "Select a group";
  return null;
}

// CREATE ATHLETE
export async function createAthlete(dto: AthletesInterface) {
  const nameErr = validateAthleteName(dto.name);
  if (nameErr) return nameErr;

  const expErr = validateExperience(dto.experience);
  if (expErr) return expErr;

  const statusErr = validateStatus(dto.status);
  if (statusErr) return statusErr;

  const groupErr = validateGroupId(Number(dto.groupId));
  if (groupErr) return groupErr;

  const athleteDTO = {
    name: dto.name,
    experience: dto.experience,
    status: dto.status,
    groupId: Number(dto.groupId)
  };

  return AthleteRepo.createAthlete(athleteDTO);
}


// DELETE ATHLETE
export async function deleteAthlete(athleteId: number) {
  return AthleteRepo.deleteAthlete(athleteId);
}