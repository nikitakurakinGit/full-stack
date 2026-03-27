import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as athleteService from "../../services/athleteServices";
import type { AthletesInterface } from "../interface/athletesInterface";
import type { GroupsInterface } from "../interface/groupsInterface";

type AthleteFormProps = {
  addAthlete: (athlete: AthletesInterface) => void;
  groupsData: GroupsInterface[];
};

export default function AthleteForm({ addAthlete, groupsData }: AthleteFormProps) {

  const name = useFormInput("", (value) => athleteService.validateAthleteName(value));

  const experience = useFormInput("", (value) => {
    if (!value) return "Select experience level";
    return null;
  });
  
  const status = useFormInput("", (value) => {
    if (!value) return "Select status";
    return null;
  });

  const selectedGroup = useFormInput("", (value) => {
    if (!value) return "Select a group";
    return null;
  });

  const [success, setSuccess] = useState("");

  function resetForm() {
    name.reset();
    experience.reset();
    status.reset();
    selectedGroup.reset();
    setSuccess("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validName = name.validate();
    const validGroup = selectedGroup.validate();
    const validExperience = experience.validate();
    const validStatus = status.validate();

    if (!validName || !validExperience || !validStatus || !validGroup) return;

    const athleteId = Math.floor(1000 + Math.random() * 9000);

    const newAthlete: AthletesInterface = {
      id: athleteId,
      name: name.value,
      experience: experience.value as "Beginner" | "Intermediate" | "Advanced",
      status: status.value as "Active" | "Inactive" | "Injured",
      groupId: selectedGroup.value
    };

    const dto = {
      ...newAthlete,
      groupId: Number(newAthlete.groupId)  
    };

    athleteService.createAthlete(dto);

    addAthlete(newAthlete);

    resetForm();
    setSuccess("Athlete added successfully");

    setTimeout(() => setSuccess(""), 5000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#222527] text-white shadow-md rounded-lg m-10 p-10 max-w-md mx-auto"
    >
      <h2 className="flex font-bold text-[22px] mb-5 justify-center">Add New Athlete</h2>

      <label className="block pb-2">
        Name:
        <input
          value={name.value}
          onChange={(e) => name.setValue(e.target.value)}
          className="border rounded-md p-1 m-1 text-black"
          placeholder="Athlete Name"
        />
        {name.error && <p className="text-red-600 text-sm">{name.error}</p>}

      </label>

      <label className="block pb-2">
        Experience:
        <select
          value={experience.value}
          onChange={(e) =>
            experience.setValue(
              e.target.value as "Beginner" | "Intermediate" | "Advanced"
            )
          }
          className={`border rounded-md p-1 m-1 
            ${experience.value === "" ? "text-gray-500" : "text-black"}`}
        >
          <option value="" disabled className="text-gray-500">Select experience</option>
          <option value="Beginner" className="text-black">Beginner</option>
          <option value="Intermediate" className="text-black">Intermediate</option>
          <option value="Advanced" className="text-black">Advanced</option>
        </select>

        {experience.error && (
          <p className="text-red-600 text-sm">{experience.error}</p>
        )}

      </label>

      <label className="block pb-2">
        Status:
        <select
          value={status.value}
          onChange={(e) =>
            status.setValue(
              e.target.value as "Active" | "Inactive" | "Injured"
            )
          }
          className={`border rounded-md p-1 m-1 
            ${status.value === "" ? "text-gray-500" : "text-black"}`}
        >
          <option value="" disabled className="text-gray-500">Select status</option>
          <option value="Active" className="text-black">Active</option>
          <option value="Inactive" className="text-black">Inactive</option>
          <option value="Injured" className="text-black">Injured</option>
        </select>

        {status.error && (
          <p className="text-red-600 text-sm">{status.error}</p>
        )}
      </label>

      <label className="block pb-2">
        Group:
        <select
          value={selectedGroup.value}
          onChange={(e) => selectedGroup.setValue(e.target.value)}
          className={`border rounded-md p-1 m-1 
            ${selectedGroup.value === "" ? "text-gray-500" : "text-black"}`}
        >
          <option value="" disabled className="text-gray-500">
            Select a group
          </option>

          {groupsData.map((g) => (
            <option key={g.id} value={g.id} className="text-black">
              {g.name}
            </option>
          ))}
        </select>
        
        {selectedGroup.error && (
          <p className="text-red-600 text-sm">{selectedGroup.error}</p>
        )}
      </label>

      {success && <p className="text-green-600 text-sm">{success}</p>}

      <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="text-black border rounded-md mt-5 px-3 py-2 bg-[#848e94] hover:bg-[#5e656a]"
        >
          Save Athlete
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="text-black border rounded-md mt-5 px-3 py-2 bg-[#848e94] hover:bg-[#5e656a]"
        >
          Reset
        </button>
      </div>
    </form>
  );
}