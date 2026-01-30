import { useState } from "react";
import type { CoachInterface } from "../interface/coachesInterface";

type FormProp = {
    onAddCoach: (
    coach: CoachInterface) => void
}

export default function Form({ onAddCoach }: FormProp) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [group, setGroup] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function resetForm(){
        setName("")
        setTitle("")
        setGroup("")
        setSuccess("")
        setError("")
    }
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(!name.trim()) {
            setError("Enter coach name")
            return
        }

        if(!title.trim()) {
            setError("Enter coach title")
            return
        }

        if(!group) {
            setError("Select Group")
            return
        }

        const newCoach: CoachInterface = {
            id: Math.floor(1000 + Math.random() * 9000),
            name,
            title,
            group
        }

        onAddCoach(newCoach)
        resetForm()

        setSuccess("Coach added successfully")
        setTimeout(() => {
            setSuccess("")
        }, 5000)
    }


    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border-2 rounded gap-5 p-5 mt-20 w-full max-w-xl mx-auto">
                <label>
                    Name: <input
                    value={name}
                    onChange={(e) => setName(e.target.value)} className="border-2 rounded"
                    name="myInput"
                    placeholder=" Coach name"/>
                </label>
                <label>
                    Title: <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} className="border-2 rounded"
                    name="myInput"
                    placeholder=" Coach title"/>
                </label>
                <label>
                    Group: 
                    <select
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        className="border-2 rounded p-1 m-2"
                    >
                        <option value="">Select Group</option>
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