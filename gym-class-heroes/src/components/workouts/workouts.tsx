import type { WorkoutsInterface } from "../interface/workoutsInterface";
type WorkoutProps = {
        onRemoveWorkout: (workoutId: number) => void;
        workouts: WorkoutsInterface[];
    }

function Workouts({ workouts, onRemoveWorkout }: WorkoutProps) {
    return (
        <section className="mt-10 flex flex-wrap justify-center gap-8 px-6 py-10
                        w-full max-w-6xl mx-auto bg-[#bcc8d0]
                        border-2 border-gray-300 rounded-2xl">
            {workouts.map((workout) => (
                <div key={workout.id} className="flex flex-col items-center gap-4">
                    <div className="flex flex-col bg-white border border-gray-200
                          rounded-xl shadow-md p-6 w-64 hover:shadow-lg transition-shadow duration-300">
                        <ul className="list-disc list-inside space-y-1 text-sm text-[#0c0e0e]">
                            {workout.workout.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            </ul>
                        <span className="border text-sm font-medium mt-3 text-center text-[#0c0e0e]">Group: {workout.groups}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveWorkout(workout.id)}
                        className="border border-black rounded py-2 px-3
                        bg-white hover:bg-gray-100 active:scale-95
                        transition">Remove</button>
                </div>
            ))}
        </section>
    )
}

export default Workouts;