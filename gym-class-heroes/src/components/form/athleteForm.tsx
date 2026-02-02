import { useState } from "react";
import type { AthletesInterface } from "../interface/athletesInterface";
import type { GroupsInterface } from "../interface/groupsInterface";

type AthleteFormProps = {
    groupsData: GroupsInterface[];
    addAthlete: (athlete: AthletesInterface, groupId: string) => void;
};

export default function AthleteForm({ groupsData, addAthlete }: AthleteFormProps) {
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");

    const [experience, setExperience] = useState<
        "Beginner" | "Intermediate" | "Advanced"
    >("Beginner");

    const [status, setStatus] = useState<"Active" | "Inactive" | "Injured">(
        "Active",
    );

    const [selectedGroupId, setSelectedGroupId] = useState("");

    // validation
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Reset fields
    function resetForm() {
        setName("");
        setSport("");
        setExperience("Beginner");
        setStatus("Active");
        setSelectedGroupId("");
        setError("");
        setSuccess("");
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Input Validation
        if (!name.trim()) {
            setError("Missing athlete's name.");
            return;
        }

        if (!sport.trim()) {
            setError("Missing athlete's sport.");
            return;
        }

        if (!selectedGroupId) {
            setError("Missing group selection.");
            return;
        }

        // Create Athlete (athlete data only)
        const newAthlete: AthletesInterface = {
            id: Math.floor(1000 + Math.random() * 9000),
            name,
            sport,
            experience,
            status
        };

        // send to parent
        addAthlete(newAthlete, selectedGroupId);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-between bg-[#222527] text-white shadow-md rounded m-5 p-5"
        >
            <h2 className="font-bold text-lg mb-2">Add Athlete</h2>

            <label>
                Name:
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-1 m-1 text-black"
                />
            </label>

            <label>
                Sport:
                <input
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="border rounded p-1 m-1 text-black"
                />
            </label>

            <label>
                Experience:
                <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value as "Beginner" | "Intermediate" | "Advanced")}
                    className="border rounded p-1 m-1 text-black"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </label>

            <label>
                Status:
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Active" | "Inactive" | "Injured")}
                    className="border rounded p-1 m-1 text-black"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Injured">Injured</option>
                </select>
            </label>

            <label>
                Group:
                <select
                    value={selectedGroupId}
                    onChange={(e) => setSelectedGroupId(e.target.value)}
                    className="border rounded p-1 m-1 text-black"
                >
                    <option value="">Select a group</option>
                    {groupsData.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="border rounded mt-5 px-3 py-2 bg-[#848e94] hover:bg-[#5e656a]"
                >
                    Save Athlete
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="border rounded mt-5 px-3 py-2 bg-[#848e94] hover:bg-[#5e656a]"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}