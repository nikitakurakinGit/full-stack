import { useEffect, useState } from 'react';
import Workouts from "../components/workouts/workouts";
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';
import WorkoutForm from '../components/form/workoutForm';
import type { GroupArrayKey } from '../components/interface/groupArrayKey';
import type { GroupsInterface } from '../components/interface/groupsInterface';
import * as workoutService from "../services/workoutServices";

type WorkoutPageProps = {
    groupsData: GroupsInterface[];
    addToGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
    removeFromGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void; 
}
export default function WorkoutsPage({groupsData, addToGroup, removeFromGroup}: WorkoutPageProps) {
    const [workouts, setWorkouts] = useState<WorkoutsInterface[]>([]);

    useEffect(() => {
        const workoutData = workoutService.fetchWorkouts();
        setWorkouts(workoutData);
    }, []);

    const onAddWorkout = (newWorkout: WorkoutsInterface) => {
        const workoutResult = workoutService.createWorkout(newWorkout);

        if (typeof workoutResult === "string") {
            console.error(workoutResult);
            return;
        }

        setWorkouts(workoutService.fetchWorkouts());

        addToGroup(workoutResult.group, "workoutsById", workoutResult.id);
    };

    const onRemoveWorkout = (workoutId: number) => {
        const workout = workoutService.getWorkoutById(workoutId);

        workoutService.deleteWorkout(workoutId);
        
        setWorkouts(workoutService.fetchWorkouts());

        removeFromGroup(workout.group, "workoutsById", workoutId);
    };

    return (
        <>
            <div className='flex flex-col w-full min-h-screen bg-gray-50'>
                <Workouts workouts={workouts} onRemoveWorkout={onRemoveWorkout}/>
                <WorkoutForm groupsData={groupsData} onAddWorkout={onAddWorkout}/>
            </div>
            
        </>
    )
}
