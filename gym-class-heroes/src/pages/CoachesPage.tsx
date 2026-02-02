import { useState } from 'react';
import Coaches from "../components/coaches/coaches";
import { coachData } from '../data/coachData';
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';
import type { GroupArrayKey } from '../components/interface/groupArrayKey';

type CoachPageProps = {
    addToGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
    removeFromGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
}

export default function CoachesPage({ addToGroup, removeFromGroup }: CoachPageProps) {
    const [coaches, setCoaches] = useState<CoachInterface[]>(coachData)

    const onAddCoach = (newCoach: CoachInterface) => {
        setCoaches(prev => [...prev, newCoach])
        addToGroup(newCoach.group, "coachesById", newCoach.id)
    }

    const onRemoveCoach = (coach: CoachInterface) => {
        setCoaches( prev => prev.filter(currentCoach => currentCoach.id !== coach.id))
        removeFromGroup(coach.group, "coachesById", coach.id)
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