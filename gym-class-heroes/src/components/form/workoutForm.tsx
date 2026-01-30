import { useState } from "react";
import type { WorkoutsInterface } from "../interface/workoutsInterface";

type workoutFormProp = {
    onAddWorkout: (
    workout: WorkoutsInterface) => void
}

export default function WorkoutForm({ onAddWorkout }: workoutFormProp) {
    const [workout, setWorkout] = useState("");
    const [groups, setGroups] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function resetForm(){
        setWorkout("")
        setGroups([])
        setSuccess("")
        setError("")
    }
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(!workout.trim()) {
            setError("Enter Workout list, separated by comma")
            return
        }

        if(groups.length === 0) {
            setError("Select at least 1 Group");
            return;
        }

        const workoutArray = workout
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");

        if (workoutArray.length === 0) {
            setError("Enter at least one valid workout");
            return;
        }

        const newWorkout: WorkoutsInterface = {
            id: Math.floor(1000 + Math.random() * 9000),
            workout: workoutArray,            
            groups: groups,
        }

        onAddWorkout(newWorkout)
        resetForm()

        setSuccess("Workout added successfully")
        setTimeout(() => {
            setSuccess("")
        }, 5000)
    }


    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center
             gap-5 p-6 mt-12 w-full max-w-xl mx-auto
             bg-[#bcc8d0] border-2 border-gray-300 rounded-2xl">
                <label>
                    New Workout: <input
                    value={workout}
                    onChange={(e) => setWorkout(e.target.value)} className="border-2 rounded"
                    name="myInput"
                    placeholder=" Workout List (comma)"
                    />
                </label>                
                <label>
                    Group: (Highlight the groups)
                    <select
                        multiple
                        value={groups}
                        onChange={(e) => {
                            const selected = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                            );
                            setGroups(selected);
                        }}
                        className="border-2 rounded p-2 mt-1 w-full"
                        >
                        <option value="A">Soccer</option>
                        <option value="B">Rugby</option>
                        <option value="C">Hockey</option>
                    </select>
                </label>
                {error && (
                    <p className="text-red-600 text-sm font-medium">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-600 text-sm font-medium">
                        {success}
                    </p>
                )}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="border border-black rounded py-2 px-3
                        bg-white hover:bg-gray-100 active:scale-95
                        transition">Submit</button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="border border-black rounded py-2 px-3
                        bg-white hover:bg-gray-100 active:scale-95
                        transition">Reset</button>
                </div>
            </form>
        </>
    )
}