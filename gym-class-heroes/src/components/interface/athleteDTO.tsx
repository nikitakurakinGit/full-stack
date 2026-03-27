export interface AthleteDTO {
  name: string;
  experience: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Inactive" | "Injured";
  groupId: number;
}