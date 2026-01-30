import { useState } from 'react';
import Workouts from "../components/workouts/workouts";
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';
import WorkoutForm from '../components/form/workoutForm';
import { workoutData } from '../data/workoutData';


export default function WorkoutsPage() {
    const [workouts, setworkouts] = useState<WorkoutsInterface[]>(workoutData)

    const onAddWorkout = (newworkout: WorkoutsInterface) => {
        setworkouts(prev => [...prev, newworkout])
    }

    const onRemoveWorkout = (workoutId: number) => {
        setworkouts( prev => prev.filter(workout => workout.id !== workoutId))
    }

    return (
        <>
            <div className='flex flex-col w-full min-h-screen bg-gray-50'>
                <Workouts workouts={workouts} onRemoveWorkout={onRemoveWorkout}/>
                <WorkoutForm onAddWorkout={onAddWorkout}/>
            </div>
            
        </>
    )
}