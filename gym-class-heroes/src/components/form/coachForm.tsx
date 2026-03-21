import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as coachService from '../../services/coachServices';
import * as coachRepo from '../../apis/coachesRepo';
import type { CoachInterface } from "../interface/coachesInterface";
import { useGroupContext } from "../../hooks/useGroupContext";

//I think this form should be on a click basis. Like its just a button that says add coach and the form pops up middle of the screen and blanks out the background. Shouldnt be too hard.

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

    const group = useFormInput("", (value) => {
        return coachService.validateGroup(value)
    })


    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    function resetForm(){
        name.reset()
        title.reset()
        group.reset()
        setSuccess("")    
    }

    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const isNameValid = name.validate()
        const isTitleValid = title.validate()
        const isGroupValid = group.validate()

        
        if(!isNameValid || !isTitleValid || !isGroupValid) return;

        const coachPayload = {
            name: name.value,
            title: title.value,
            group: group.value
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
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#222527] text-white shadow-md rounded gap-5 p-5 mt-20 w-full max-w-xl mx-auto">
                <label>
                    Name: <input
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)} className="border-2 rounded text-black"
                    name="myInput"
                    placeholder=" Coach name"/>
                    
                    <div className="flex items-center justify-center mt-3">
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
                    </div>
                </label>
                <label>
                    Title: <input
                    value={title.value}
                    onChange={(e) => title.setValue(e.target.value)} className="border-2 rounded text-black"
                    name="myInput"
                    placeholder=" Coach title"/>
                    
                    <div className="flex items-center justify-center mt-3">
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
                    </div>
                </label>
                <label>
                    Group: 
                    <select
                        value={group.value}
                        onChange={(e) => group.setValue(e.target.value)}
                        className="border-2 rounded p-1 m-2 text-black"
                    >
                        <option value="">Select Group</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.name}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center justify-center mt-3">
                        {group.error && (
                        <p className="text-red-600 text-sm font-medium">
                            {group.error}
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
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="border border-black rounded py-2 px-3
                        bg-white text-black hover:bg-gray-100 active:scale-95
                        transition">Submit</button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="border border-black rounded py-2 px-3
                        bg-white text-black hover:bg-gray-100 active:scale-95
                        transition">Reset</button>
                </div>
            </form>
        </>
    )
}