import { useState, useEffect } from 'react';
import Coaches from "../components/coaches/coaches";
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';
import * as coachServices from '../services/coachServices';
import * as coachRepo from '../apis/coachesRepo';
import { Modal } from "../components/layout/modal";
import { useAuth } from '@clerk/clerk-react';
import { useGroupContext } from "../hooks/useGroupContext";


export default function CoachesPage() {
    const { getToken } = useAuth()
    const { refreshGroups } = useGroupContext()
    const [coaches, setCoaches] = useState<CoachInterface[]>([])
    const [ showForm, setShowForm ] = useState(false)

    useEffect(() => {
        const fetchCoaches = async () => {
            const token = await getToken()
            if(!token) return 
            const coaches = await coachServices.fetchCoaches(token)
             setCoaches([...coaches])
        }
        fetchCoaches();
    }, [])


    const onAddCoach = async (newCoach: CoachInterface) => {        
        setCoaches(prev => [...prev, newCoach])
    }

    const onRemoveCoach = async (coach: CoachInterface) => {
        try{
            const token = await getToken()
            if(!token) return
            await coachRepo.deleteCoach(coach.id, token);
            refreshGroups();
            setCoaches(prev => prev.filter(c => c.id !== coach.id))

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
                    {showForm ? "Close Form" : "Add Coach"}
                    </button>
                </div>

                {showForm && (
                    <Modal onClose={() => setShowForm(false)}>
                        <Form
                            onAddCoach={onAddCoach}/>
                    </Modal>
                )}
                
                <Coaches
                coaches={coaches}
                onRemoveCoach={onRemoveCoach}/>
            </div>
            
        </>
    )
}