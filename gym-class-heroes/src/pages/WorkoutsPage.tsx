import { useState, useEffect } from 'react';
import Workouts from "../components/workouts/workouts";
import type { WorkoutsInterface } from '../components/interface/workoutsInterface';
import Form from '../components/form/workoutForm';
import * as workoutServices from '../services/workoutServices';
import * as workoutRepo from '../apis/workoutRepository';
import { Modal } from "../components/layout/modal";
import { useAuth } from '@clerk/clerk-react';


export default function WorkoutsPage() {
    const { getToken } = useAuth()
    const [workouts, setWorkouts] = useState<WorkoutsInterface[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const token = await getToken()
            if(!token) return 
            const workouts = await workoutServices.fetchWorkouts(token)
             setWorkouts([...workouts])
        }
        fetchWorkouts();
    }, [])


    const onAddWorkout = async (newWorkout: WorkoutsInterface) => {        
        setWorkouts(prev => [...prev, newWorkout])
    }

    const onRemoveWorkout = async (workout: WorkoutsInterface) => {
        try{
            const token = await getToken()
            if(!token) return
            await workoutRepo.deleteWorkout(workout.id, token);

            setWorkouts(prev => prev.filter(w => w.id !== workout.id))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='flex flex-col w-full px-6 py-4 mx-auto'>
                <div className="flex justify-left gap-4">
                    <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="bg-[#222527] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#5e656a]"
                    >
                    {showForm ? "Close Form" : "Add Workout"}
                    </button>
                </div>

                {showForm && (
                    <Modal onClose={() => setShowForm(false)}>
                        <Form
                            onAddWorkout={onAddWorkout}/>
                    </Modal>
                )}
                
                <Workouts
                workouts={workouts}
                onRemoveWorkout={onRemoveWorkout}/>
            </div>
            
        </>
    )

}
