import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as coachService from '../../services/coachServices';
import * as coachRepo from '../../apis/coachesRepo';
import type { CoachInterface } from "../interface/coachesInterface";
import { useGroupContext } from "../../hooks/useGroupContext";
import type { CoachDTO } from "../interface/coachDTO";

type FormProp = {
    onAddCoach: (
    coach: CoachInterface) => void;
}

export default function Form({ onAddCoach}: FormProp) {
    const { groups } = useGroupContext();
    
    const name = useFormInput("", (value) => {
        return coachService.validateCoachName(value)
    })

    const title = useFormInput("", (value) => {
        return coachService.validateCoachTitle(value)
    })

    const groupId = useFormInput("", (value) => {
        return coachService.validateGroup(value)
    })


    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    function resetForm(){
        name.reset()
        title.reset()
        groupId.reset()
        setSuccess("")    
    }

    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const isNameValid = name.validate()
        const isTitleValid = title.validate()
        const isGroupValid = groupId.validate()

        
        if(!isNameValid || !isTitleValid || !isGroupValid) return;

        const coachPayload: CoachDTO = {
            name: name.value,
            title: title.value,
            groupId: Number(groupId.value)
        }
        
        try {
            const newCoach = await coachRepo.createCoach(coachPayload);
            
            onAddCoach(newCoach);
            
        } catch(error: any) {
            setServerError(error.message)
        }

        resetForm()

        setSuccess("Coach added successfully")
        setTimeout(() => {
            setSuccess("")
        }, 5000)
    }


    return(
        <>
            <form onSubmit={handleSubmit} className="bg-[#222527] text-white shadow-md rounded-lg m-10 p-10 max-w-md mx-auto">
                <h2 className="flex font-bold text-[22px] mb-5 justify-center">Add New Coach</h2>
                <label className="block pb-2">
                    Name: <input
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)} className="border rounded-md p-1 m-2 text-black"
                    name="myInput"
                    placeholder=" Coach name"/>
                    
                    {name.error && (
                    <p className="text-red-600 text-sm font-medium">
                        {name.error}
                    </p>
                    )}
                    {serverError && (
                        <p className="text-red-600 text-sm font-medium mt-2">
                        {serverError}
                    </p>
                    )}
                </label>
                <label className="block pb-2">
                    Title: <input
                    value={title.value}
                    onChange={(e) => title.setValue(e.target.value)} className="border rounded-md p-1 m-2 text-black"
                    name="myInput"
                    placeholder=" Coach title"/>
                    
                    {title.error && (
                    <p className="text-red-600 text-sm font-medium">
                        {title.error}
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
                        onChange={(e) => groupId.setValue(e.target.value)}
                        className="border-2 rounded p-1 m-2 text-black"
                    >
                        <option value="">Select Group</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <div className="">
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
                        className="text-black border rounded-md mt-5 px-3 py-2 bg-white hover:bg-gray-300
                        transition">Submit</button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="text-black border rounded-md mt-5 px-3 py-2 bg-white hover:bg-gray-300
                        transition">Reset</button>
                </div>
            </form>
        </>
    )
}