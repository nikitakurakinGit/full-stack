import { workoutData } from "../data/workoutData";
import type { WorkoutsInterface } from "../components/interface/workoutsInterface";

// Get all workouts
export function fetchWorkouts(): WorkoutsInterface[] {
    return workoutData;
}

// Get workout by ID
export function getWorkoutById(id: number): WorkoutsInterface {
    const foundWorkout = workoutData.find(w => w.id === id);

    if (!foundWorkout) {
        throw new Error(`Failed to fetch workout with id ${id}`);
    }

    return foundWorkout;
}

// Create a new workout
export function createWorkout({id, workout, group}: WorkoutsInterface): WorkoutsInterface {

    const newWorkout: WorkoutsInterface = {
        id,
        workout,
        group
    };

    workoutData.push(newWorkout);

    return newWorkout;
}

// Update an existing workout
export function updateWorkout(
    updatedWorkout: WorkoutsInterface
): WorkoutsInterface {
    const index = workoutData.findIndex(
        w => w.id === updatedWorkout.id
    );

    if (index === -1) {
        throw new Error(
            `Failed to update workout with id ${updatedWorkout.id}`
        );
    }

    workoutData[index] = updatedWorkout;
    return workoutData[index];
}

// Delete a workout
export function deleteWorkout(id: number): number {
    const index = workoutData.findIndex(w => w.id === id);

    if (index === -1) {
        throw new Error(`Failed to delete workout with id ${id}`);
    }

    workoutData.splice(index, 1);
    return id;
}