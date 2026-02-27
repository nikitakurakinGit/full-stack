import * as workoutRepo from "../apis/workoutRepository"
import type { WorkoutsInterface } from "../components/interface/workoutsInterface";


// Fetch all workouts
export function fetchWorkouts(): WorkoutsInterface[] {
    return workoutRepo.fetchWorkouts();
}


// Get workout by ID
export function getWorkoutById(id: number): WorkoutsInterface {
    return workoutRepo.getWorkoutById(id);
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

    // future: call group service to verify group exists

    return null;
}


// Create workout
export function createWorkout({
    id,
    workout,
    group
}: WorkoutsInterface) {

    const workoutErr = validateWorkoutList(workout);
    if (workoutErr) return workoutErr;

    const groupErr = validateGroup(group);
    if (groupErr) return groupErr;

    return workoutRepo.createWorkout({ id, workout, group });
}


// Update workout
export function updateWorkout(
    updatedWorkout: WorkoutsInterface
) {

    const workoutErr = validateWorkoutList(updatedWorkout.workout);
    if (workoutErr) return workoutErr;

    const groupErr = validateGroup(updatedWorkout.group);
    if (groupErr) return groupErr;

    return workoutRepo.updateWorkout(updatedWorkout);
}


// Delete workout
export function deleteWorkout(id: number): boolean {
    return workoutRepo.deleteWorkout(id);
}