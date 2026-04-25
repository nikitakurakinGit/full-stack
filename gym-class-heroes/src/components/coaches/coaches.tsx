import type { CoachInterface } from "../interface/coachesInterface";
import { useState } from 'react'
import { Modal } from "../layout/modal";
import GroupPopUp from "../groups/groupPopUp";

type CoachesProps = {
        onRemoveCoach: (coach: CoachInterface) => void;
        coaches: CoachInterface[];
    }

function Coaches({ coaches, onRemoveCoach }: CoachesProps) {

    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w- full max-w-6xl mx-auto p-6">
            {coaches.map((coach) => (
                <div className="p-4 rounded shadow-md border border-[#3e4447]" key={coach.id}>
                    <div className="flex flex-col items-baseline gap-2 w-full">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="text-lg font-semibold drop-shadow">{coach.name}</h4>
                            <button
                            type="button"
                            onClick={() => onRemoveCoach(coach)}
                            className="bg-[#848e94] text-white text-sm px-3 py-1 rounded-md hover:bg-[#5e656a]">
                                X
                            </button>
                        </div>
                        
                        <div>
                            <span className="text-sm italic mb-2">{coach.title} | </span>
                            <span className="text-sm italic mb-2 cursor-pointer hover:text-blue-400 transition" 
                            onClick={() => setSelectedGroup(coach.group.id)}>
                                {coach.group.name}
                                </span>
                        </div>
                    </div>
                    
                </div>
            ))}

            {selectedGroup && (
                <Modal onClose={() => setSelectedGroup(null)}>
                    <GroupPopUp groupId={selectedGroup}/>
                </Modal>
            )}
        </section>
    )
}

export default Coaches;