import * as AthleteRepo from "../apis/athleteRepository";
import type { AthletesInterface } from "../components/interface/athletesInterface";

// FETCH ATHLETES
export async function fetchAthletes() {
  return AthleteRepo.fetchAthletes();
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
  if (!group.trim()) return "Select a group";
  return null;
}

// CREATE ATHLETE
export async function createAthlete(athlete: AthletesInterface) {
  const nameErr = validateAthleteName(athlete.name);
  if (nameErr) return nameErr;

  const expErr = validateExperience(athlete.experience);
  if (expErr) return expErr;

  const statusErr = validateStatus(athlete.status);
  if (statusErr) return statusErr;

  const groupErr = validateGroup(athlete.group);
  if (groupErr) return groupErr;

  const groupId = Number(athlete.group);

  if (isNaN(groupId)) {
    return "Invalid group selected";
  }

  const athleteDTO = {
    name: athlete.name,
    experience: athlete.experience,
    status: athlete.status,
    groupId: groupId
  };

  return AthleteRepo.createAthlete(athleteDTO);
}

// DELETE ATHLETE
export async function deleteAthlete(athleteId: number) {
  return AthleteRepo.deleteAthlete(athleteId);
}