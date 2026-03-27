import * as workoutServices from '../apis/workoutRepository';
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';


// Fetch all workouts
export async function fetchWorkouts(): Promise<WorkoutsInterface[]> {
    const workouts = await workoutServices.fetchWorkouts();
    return workouts;
}


// Validate workout list
export function validateWorkoutList(workout: string[]) {
    if (!workout || workout.length === 0) {
        return "Enter at least one workout";
    }

    return null;
}


// Validate group
export function validateGroup(group: string) {
    if (!group.trim()) return "Select group";

    return null;
}


// Delete workout
export async function deleteWorkout(workoutId: number) {
    console.log("deleteWorkout service ran");

    return workoutServices.deleteWorkout(workoutId);
}
