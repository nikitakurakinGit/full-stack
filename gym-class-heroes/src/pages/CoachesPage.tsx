import { useState, useEffect } from 'react';
import Coaches from "../components/coaches/coaches";
import { coachData } from '../data/coachData';
import type { CoachInterface } from '../components/interface/coachesInterface';
import Form from '../components/form/coachForm';
import * as coachServices from '../services/coachServices';
import { useGroupData } from '../hooks/useGroupData';

export default function CoachesPage() {
    const [coaches, setCoaches] = useState<CoachInterface[]>(coachData)
    const { groups, error, addToGroup, removeFromGroup } = useGroupData();
    //hold group data in state here

    useEffect(() => {
        const fetchCoaches = async () => {
            const coaches = await coachServices.fetchCoaches()
             setCoaches([...coaches])
        }
        fetchCoaches();
    }, [])


    const onAddCoach = async (newCoach: CoachInterface) => {
        try {
            const createdCoach = await coachServices.createCoach(newCoach)

            if(typeof createdCoach === "string") {
                console.error(createdCoach)
                return 
            }

            setCoaches(prev => [...prev, createdCoach])
            addToGroup(newCoach.group, "coachesById", newCoach.id)
        } catch (error) {
            console.error(error)
        }
    }

    const onRemoveCoach = async (coach: CoachInterface) => {
        try{
            console.log("remove coach ran from coaches page")
            const deletedCoachId = await coachServices.deleteCoach(coach.id)

            removeFromGroup(coach.group, "coachesById", coach.id)

            setCoaches(prev => prev.filter(coach => coach.id !== deletedCoachId))

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
                onAddCoach={onAddCoach}
                groups={groups}/>
            </div>
            
        </>
    )
}