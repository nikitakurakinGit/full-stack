import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as workoutService from '../../services/workoutServices';
import * as workoutRepo from '../../apis/workoutRepository';
import type { WorkoutsInterface } from "../interface/workoutsInterface";
import { useGroupContext } from "../../hooks/useGroupContext";
import type { WorkoutDTO } from "../interface/workoutDTO";

type FormProp = {
    onAddWorkout: (
        workout: WorkoutsInterface
    ) => void;
}

export default function Form({ onAddWorkout }: FormProp) {

    const { groups } = useGroupContext();

    const workoutList = useFormInput("", (value) => {
        const arr = value
            .split(",")
            .map(w => w.trim())
            .filter(w => w !== "");

        return workoutService.validateWorkoutList(arr);
    });

    const groupId = useFormInput("", (value) => {
        return workoutService.validateGroup(value);
    });

    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    function resetForm() {
        workoutList.reset();
        groupId.reset();
        setSuccess("");
    }

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        const isWorkoutValid =
            workoutList.validate();

        const isGroupValid =
            groupId.validate();

        if (!isWorkoutValid || !isGroupValid)
            return;

        const workoutPayload: WorkoutDTO = {
            workout: workoutList.value
                .split(",")
                .map(w => w.trim())
                .filter(w => w !== ""),
            groupId: Number(groupId.value)
        };

        try {

            const newWorkout =
                await workoutRepo.createWorkout(
                    workoutPayload
                );

            onAddWorkout(newWorkout);

        } catch (error: any) {

            setServerError(error.message);

        }

        resetForm();

        setSuccess(
            "Workout added successfully"
        );

        setTimeout(() => {
            setSuccess("");
        }, 5000);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-[#222527] text-white shadow-md rounded-lg m-10 p-10 max-w-md mx-auto"
            >

                <h2 className="flex font-bold text-[22px] mb-5 justify-center">
                    Add New Workout
                </h2>

                <label className="block pb-2">

                    Workout List:

                    <input
                        value={workoutList.value}
                        onChange={(e) =>
                            workoutList.setValue(
                                e.target.value
                            )
                        }
                        className="border rounded-md p-1 m-2 text-black"
                        placeholder="Workout list (comma separated)"
                    />

                    {workoutList.error && (
                        <p className="text-red-600 text-sm font-medium">
                            {workoutList.error}
                        </p>
                    )}

                    {serverError && (
                        <p className="text-red-600 text-sm font-medium mt-2">
                            {serverError}
                        </p>
                    )}

                </label>

                <label className="block pb-2">

                    Group:

                    <select
                        value={groupId.value}
                        onChange={(e) =>
                            groupId.setValue(
                                e.target.value
                            )
                        }
                        className="border-2 rounded p-1 m-2 text-black"
                    >

                        <option value="">
                            Select Group
                        </option>

                        {groups.map(group => (
                            <option
                                key={group.id}
                                value={group.id}
                            >
                                {group.name}
                            </option>
                        ))}

                    </select>

                    <div>

                        {groupId.error && (
                            <p className="text-red-600 text-sm font-medium">
                                {groupId.error}
                            </p>
                        )}

                        {serverError && (
                            <p className="text-red-600 text-sm font-medium mt-2">
                                {serverError}
                            </p>
                        )}

                    </div>

                </label>

                {success && (
                    <p className="text-green-600 text-sm font-medium">
                        {success}
                    </p>
                )}

                <div className="flex justify-center gap-3">

                    <button
                        type="submit"
                        className="text-black border rounded-md mt-5 px-3 py-2 bg-white hover:bg-gray-300 transition"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        className="text-black border rounded-md mt-5 px-3 py-2 bg-white hover:bg-gray-300 transition"
                    >
                        Reset
                    </button>

                </div>

            </form>
        </>
    );
}
