export interface AthletesInterface {
  id: number;
  name: string;
  experience: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Inactive" | "Injured";
  groupId: string;
}