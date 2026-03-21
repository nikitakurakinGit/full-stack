import { useState, useEffect } from 'react';
import Coaches from "../components/coaches/coaches";
import { coachData } from '../data/coachData';
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';
import * as coachServices from '../services/coachServices';
import * as coachRepo from '../apis/coachesRepo';


export default function CoachesPage() {
    const [coaches, setCoaches] = useState<CoachInterface[]>(coachData)

    useEffect(() => {
        const fetchCoaches = async () => {
            const coaches = await coachServices.fetchCoaches()
             setCoaches([...coaches])
        }
        fetchCoaches();
    }, [])


    const onAddCoach = async (newCoach: CoachInterface) => {        
        setCoaches(prev => [...prev, newCoach])
    }

    const onRemoveCoach = async (coach: CoachInterface) => {
        try{
            console.log("remove coach ran from coaches page")
            
            await coachRepo.deleteCoach(coach.id);

            setCoaches(prev => prev.filter(c => c.id !== coach.id))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='flex flex-col w-full px-6 py-4 max-w-7xl mx-auto'>
                <Coaches
                coaches={coaches}
                onRemoveCoach={onRemoveCoach}/>
                
                <Form
                onAddCoach={onAddCoach}/>
            </div> 
        </>
    )
}