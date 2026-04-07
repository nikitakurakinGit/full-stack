import type { WorkoutsInterface } from "../interface/workoutsInterface";
import { useState } from 'react';
import { Modal } from "../layout/modal";
import GroupPopUp from "../groups/groupPopUp";

type WorkoutsProps = {
    onRemoveWorkout: (workout: WorkoutsInterface) => void;
    workouts: WorkoutsInterface[];
}

function Workouts({ workouts, onRemoveWorkout }: WorkoutsProps) {

    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
            {workouts.map((workout) => (
                <div className="p-4 rounded shadow-md border border-[#3e4447]" key={workout.id}>
                    <div className="flex flex-col items-baseline gap-2">
                        <h4 className="text-lg font-semibold drop-shadow">Workout #{workout.id}</h4>
                        <ul className="list-disc list-inside text-sm text-[#0c0e0e] mb-2">
                            {workout.workout.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <div>
                            <span 
                                className="text-sm italic cursor-pointer hover:text-blue-400 transition" 
                                onClick={() => setSelectedGroup(Number(workout.group))}
                            >
                                Group: {workout.group.name}
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveWorkout(workout)}
                        className="border border-black rounded py-2 px-3 mt-5
                        bg-white text-sm hover:bg-gray-100 active:scale-95
                        transition">Remove Workout</button>
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

export default Workouts;
