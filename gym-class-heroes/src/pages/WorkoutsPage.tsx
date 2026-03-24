import { useEffect, useState } from 'react';
import Workouts from "../components/workouts/workouts";
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';
import WorkoutForm from '../components/form/workoutForm';
import * as workoutService from "../services/workoutServices";
import { useGroupData } from '../hooks/useGroupData';
import { workoutData } from '../data/workoutData';

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState<WorkoutsInterface[]>(workoutData);

    const {
        groups,
        error,
        addToGroup,
        removeFromGroup        
    } = useGroupData();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const workouts =
                await workoutService.fetchWorkouts();

            setWorkouts([...workouts]);
        }; 
        fetchWorkouts();
    }, []);

    const onAddWorkout = async (newWorkout: WorkoutsInterface) => {
        try {

        const createWorkout = await workoutService.createWorkout(newWorkout);

        if (typeof createWorkout === "string") {
            console.error(createWorkout);
            return;
        }

        setWorkouts(prev => [
            ...prev,
            createWorkout
        ]);

        addToGroup(newWorkout.group, "workoutsById", newWorkout.id);

        } catch (error) {
            console.error(error);
        }
    };

    const onRemoveWorkout = async (
        workoutId: number
    ) => {
        try {

        const workout =
            workouts.find(w => w.id === workoutId);

        if (!workout) return;

        await workoutService.deleteWorkout(workoutId);

        removeFromGroup(
            workout.group,
            "workoutsById",
            workoutId
        );

        setWorkouts(prev =>
            prev.filter(w => w.id !== workoutId)
        );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='flex flex-col w-full min-h-screen bg-gray-50'>
                <Workouts workouts={workouts} onRemoveWorkout={onRemoveWorkout}/>
                <WorkoutForm groupsData={groups} onAddWorkout={onAddWorkout}/>
            </div>
            
        </>
    )
}
