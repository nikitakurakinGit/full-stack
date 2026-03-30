import { useGroupContext } from "../../hooks/useGroupContext";

type groupPopProp = {
    groupId: number;
}

export default function GroupPopUp({groupId}: groupPopProp) {
    const { groups } = useGroupContext();
    
    const group = groups.find(group => group.id === groupId)

    if(!group) return null;

    return (
        <>
            <div className="bg-[#222527] text-white shadow-md rounded-lg m-10 p-10 max-w-md mx-auto">
                <h2 className="flex font-bold text-[22px] mb-5 justify-center">{group.name}</h2>

                {group.coach && (
                    <p className="mb-5">Coach: {group.coach.name} - {group.coach.title}</p>
                )}

                <h3 className="mb-3">Athletes: </h3>
                <ul>
                    {group.athletes.map(athlete => (
                        <li className="mb-1">{athlete.name} - {athlete.status}</li>
                    ))}
                </ul>

                <h3 className="mt-3 mb-3">Workouts:</h3>
                <ul>
                    {group.workouts.map(workout => (
                        <li className="mb-1">{workout.workout}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}