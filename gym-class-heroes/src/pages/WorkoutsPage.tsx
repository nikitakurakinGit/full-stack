// src/pages/WorkoutsPage.tsx
import { useState } from "react";
import type { WorkoutsInterface } from "../components/interface/workoutsInterface";

type WorkoutsPageProps = {
  title: string;
  workouts: WorkoutsInterface[];
};

export default function WorkoutsPage({ title, workouts }: WorkoutsPageProps) {

  // State starts with the default workouts
  const [workoutList, setWorkoutList] = useState<WorkoutsInterface[]>(workouts);
  const [nextId, setNextId] = useState(workouts.length + 1);
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

    setWorkoutList(prev => [...prev, newWorkout]);
    setNextId(prev => prev + 1);
    setExerciseInput("");
    setGroupInput("");
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      {/* Display workouts first */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Workout Lists</h2>

        {workoutList.length === 0 ? (
          <p>No workouts added yet.</p>
        ) : (
          <ul className="space-y-4">
            {workoutList.map(w => (
              <li key={w.id} className="p-4 border rounded bg-white shadow-sm">
                <strong>Workout #{w.id}</strong>

                <div className="mt-2">
                  <p className="font-semibold">Exercises:</p>
                  <ul className="list-disc list-inside">
                    {w.workout.map((exercise, i) => (
                      <li key={i}>{exercise}</li>
                    ))}
                  </ul>
                </div>

                {w.groups && (
                  <div className="mt-2">
                    <p className="font-semibold">Groups:</p>
                    <ul className="list-disc list-inside">
                      {w.groups.map((group, i) => (
                        <li key={i}>{group}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add new workout form at the end */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add New Workout</h2>

        <input
          type="text"
          placeholder="Exercises (comma separated)"
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          placeholder="Groups (optional, comma separated)"
          value={groupInput}
          onChange={(e) => setGroupInput(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <button
          onClick={addWorkout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Workout
        </button>
      </section>
    </section>
  );
}
