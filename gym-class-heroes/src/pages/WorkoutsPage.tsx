import { useState } from 'react';
import Workouts from "../components/workouts/workouts";
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';
import WorkoutForm from '../components/form/workoutForm';
import { workoutData } from '../data/workoutData';
import type { GroupArrayKey } from '../components/interface/groupArrayKey';

type WorkoutPageProps = {
    addToGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
    removeFromGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void; 
}
export default function WorkoutsPage({addToGroup, removeFromGroup}: WorkoutPageProps) {
    const [workouts, setWorkouts] = useState<WorkoutsInterface[]>(workoutData)

    const onAddWorkout = (newworkout: WorkoutsInterface) => {
        setWorkouts(prev => [...prev, newworkout]);
        addToGroup(newworkout.group, "workoutsById", newworkout.id)
    }

    const onRemoveWorkout = (workoutId: number) => {
        const workout = workouts.find(currentWorkout => currentWorkout.id === workoutId);
        if (!workout) return;

        setWorkouts( prev => prev.filter(currentWorkout => currentWorkout.id !== workoutId));
        removeFromGroup(workout.group, "workoutsById", workoutId)
    }

    return(
        <>
            <div className='flex flex-col w-full min-h-screen bg-gray-50'>
                <Workouts workouts={workouts} onRemoveWorkout={onRemoveWorkout}/>
                <WorkoutForm onAddWorkout={onAddWorkout}/>
            </div>
            
        </>
    )
}