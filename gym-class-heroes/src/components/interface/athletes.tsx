export interface Athletes {
  id: number;
  name: string;
  sport: string;
  experience: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Inactive" | "Injured";
}