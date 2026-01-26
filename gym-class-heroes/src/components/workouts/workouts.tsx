// this will allow users to add new workout to the list
import { useState } from "react";

export interface WorkoutsInterface {
    id: number;
    workout: string[];
    groups?: string[];
}

function WorkoutListStateExamplePage() {

    const [workouts, setWorkouts] = useState<WorkoutsInterface[]>([]);
    const [nextId, setNextId] = useState(1);
    const [exerciseInput, setExerciseInput] = useState("");
    const [groupInput, setGroupInput] = useState("");

    const addWorkout = () => {
        if (!exerciseInput.trim()) return;

        const newWorkout: WorkoutsInterface = {
            id: nextId,
            workout: exerciseInput.split(",").map(e => e.trim()),
            groups: groupInput
                ? groupInput.split(",").map(g => g.trim())
                : undefined
        };

        setWorkouts(old => [...old, newWorkout]);
        setNextId(id => id + 1);
        setExerciseInput("");
        setGroupInput("");
    };

    return (
        <>
            <header>
                <h1>Add Workout Lists</h1>
            </header>

            <main>
                <section>
                    <h2>Add New Workout</h2>

                    <input
                        type="text"
                        placeholder="Exercises (comma separated)"
                        value={exerciseInput}
                        onChange={(e) => setExerciseInput(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Groups (optional, comma separated)"
                        value={groupInput}
                        onChange={(e) => setGroupInput(e.target.value)}
                    />

                    <button onClick={addWorkout}>
                        Add Workout
                    </button>
                </section>

                <section>
                    <h2>Workout Lists</h2>

                    <ul>
                        {workouts.map(w => (
                            <li key={w.id}>
                                <strong>Workout #{w.id}</strong>
                                <ul>
                                    {w.workout.map((exercise, index) => (
                                        <li key={index}>{exercise}</li>
                                    ))}
                                </ul>

                                {w.groups && (
                                    <>
                                        <em>Groups:</em>
                                        <ul>
                                            {w.groups.map((group, index) => (
                                                <li key={index}>{group}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default WorkoutListStateExamplePage;
