import { useState } from "react";
import type { WorkoutsInterface } from "../interface/workoutsInterface";
import type { GroupsInterface } from "../interface/groupsInterface";
import { useFormInput } from "../../hooks/useFormInput";
import * as workoutService from "../../services/workoutServices";

type workoutFormProp = {
    groupsData: GroupsInterface[];
    onAddWorkout: (
    workout: WorkoutsInterface) => void;
};

export default function WorkoutForm(
    {groupsData, onAddWorkout }: workoutFormProp) {
    const workoutList = useFormInput("", (value) => {
        const arr = value.split(",").map(w => w.trim()).filter(w => w !== "");
        return workoutService.validateWorkoutList(arr);
    });

    const group = useFormInput("", (value) => {
        return workoutService.validateGroup(value);
    });

    const [success, setSuccess] = useState("");

    function resetForm(){
        workoutList.reset();
        group.reset();
        setSuccess("");
    }
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const isWorkoutValid = workoutList.validate();
        const isGroupValid = group.validate();

        if (!isWorkoutValid || !isGroupValid) return;

        const newWorkout: WorkoutsInterface = {
            id: Math.floor(1000 + Math.random() * 9000),
            workout: workoutList.value
                .split(",")
                .map(w => w.trim())
                .filter(w => w !== ""),
            group: group.value
        };

        onAddWorkout(newWorkout);
        resetForm();

        setSuccess("Workout added successfully");
        setTimeout(() => setSuccess(""), 5000);
        }
        

    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center
             gap-5 p-6 mt-12 w-full max-w-xl mx-auto
             bg-[#bcc8d0] border-2 border-gray-300 rounded-2xl">
                <label>
                    New Workout: <input
                    value={workoutList.value}
                    onChange={(e) => workoutList.setValue(e.target.value)} className="border-2 rounded"
                    name="myInput"
                    placeholder=" Workout List (comma)"
                    />
                </label>                
                <label>
                    Group:
                    <select
                        value={group.value}
                        onChange={(e) => group.setValue(e.target.value)}
                        className="border-2 rounded p-2 mt-1 w-full"
                        >
                        <option value="">Select Group</option>
                        {groupsData.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </label>
                {group.error && (
                    <p className="text-red-600 text-sm font-medium">
                        {group.error}
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
