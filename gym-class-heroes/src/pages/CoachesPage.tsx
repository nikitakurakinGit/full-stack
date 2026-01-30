import { useState } from 'react';
import Coaches from "../components/coaches/coaches";
import { coachData } from '../data/coachData';
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';


export default function CoachesPage() {
    const [coaches, setCoaches] = useState<CoachInterface[]>(coachData)

    const onAddCoach = (newCoach: CoachInterface) => {
        setCoaches(prev => [...prev, newCoach])
    }

    const onRemoveCoach = (coachId: number) => {
        setCoaches( prev => prev.filter(coach => coach.id !== coachId))
    }

    return (
        <>
            <div className='flex flex-col w-full'>
                <Coaches coaches={coaches} onRemoveCoach={onRemoveCoach}/>
                <Form onAddCoach={onAddCoach}/>
            </div>
            
        </>
    )
}

