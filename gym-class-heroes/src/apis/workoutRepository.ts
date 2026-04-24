import type { WorkoutDTO } from "../components/interface/workoutDTO";
import type { WorkoutsInterface } from "../components/interface/workoutsInterface";

const API_URL = import.meta.env.VITE_API_URL;


// Fetch all workouts
export async function fetchWorkouts(token: string): Promise<WorkoutsInterface[]> {
    const res = await fetch(`${API_URL}/workouts`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
    }

    const data: WorkoutsInterface[] = await res.json();

    return data;
}


// Create workout
export async function createWorkout({ workout, groupId }: WorkoutDTO, token: string): Promise<WorkoutsInterface> {

    const res = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            workout,
            groupId
        })
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
    }

    const data: WorkoutsInterface = await res.json();

    return data;
}


export async function deleteWorkout(workoutId: number, token: string): Promise<void> {

    console.log(API_URL);

    const res = await fetch(
        `${API_URL}/workouts/${workoutId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
    }
}
