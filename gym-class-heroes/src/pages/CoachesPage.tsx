import { useState, useEffect } from 'react';
import Coaches from "../components/coaches/coaches";
import { coachData } from '../data/coachData';
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';
import type { GroupArrayKey } from '../components/interface/groupArrayKey';
import type { GroupsInterface } from '../components/interface/groupsInterface';
import * as coachServices from '../services/coachServices';

type CoachPageProps = {
    addToGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
    removeFromGroup: (groupId: string, key: GroupArrayKey, subjectId: number) => void;
    groupsData: GroupsInterface[];
}

export default function CoachesPage({ addToGroup, removeFromGroup, groupsData }: CoachPageProps) {
    const [coaches, setCoaches] = useState<CoachInterface[]>(coachData)
    //hold group data in state here

    useEffect(() => {
        const fetchCoaches = async () => {
            const coaches = await coachServices.fetchCoaches()
             setCoaches([...coaches])
             //call group fetch service
        }

        fetchCoaches();
    }, [])


    const onAddCoach = (newCoach: CoachInterface) => {
        setCoaches(prev => [...prev, newCoach])
        coachServices.createCoach(newCoach)
        addToGroup(newCoach.group, "coachesById", newCoach.id)
    }

    const onRemoveCoach = (coach: CoachInterface) => {
        setCoaches( prev => prev.filter(currentCoach => currentCoach.id !== coach.id))
        removeFromGroup(coach.group, "coachesById", coach.id)
    }

    return (
        <>
            <div className='flex flex-col w-full px-6 py-4 max-w-7xl mx-auto'>
                {/* <h2 className="text-[1.25rem] font-bold uppercase tracking-wide text-[#0c0e0e] drop-shadow mb-4">
                    Coaches
                </h2> */}
                
                <Coaches
                coaches={coaches}
                onRemoveCoach={onRemoveCoach}/>
                
                <Form
                onAddCoach={onAddCoach}
                groupsData={groupsData}/>
            </div>
            
        </>
    )
}