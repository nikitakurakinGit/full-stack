import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as athleteService from "../../services/athleteServices";
import * as athleteRepo from "../../apis/athleteRepository";
import type { AthletesInterface } from "../interface/athletesInterface";
import type { AthleteDTO } from "../interface/athleteDTO";
import { useGroupContext } from "../../hooks/useGroupContext";
import { useAuth } from "@clerk/clerk-react";

type AthleteFormProps = {
  onAddAthlete: (athlete: AthletesInterface) => void;
};

export default function AthleteForm({ onAddAthlete }: AthleteFormProps) {
  const { getToken } = useAuth();
  const { groups, refreshGroups } = useGroupContext();

  const name = useFormInput("", (value) => athleteService.validateAthleteName(value));

  const experience = useFormInput("", (value) => {
    if (!value) return "Select experience level";
    return null;
  });
  
  const status = useFormInput("", (value) => {
    if (!value) return "Select status";
    return null;
  });

  const groupId = useFormInput("", (value) => {
    if (!value) return "Select a group";
    return null;
  });

  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  function resetForm() {
    name.reset();
    experience.reset();
    status.reset();
    groupId.reset();
    setSuccess("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validName = name.validate();
    const validExperience = experience.validate();
    const validStatus = status.validate();
    const validGroup = groupId.validate();

    if (!validName || !validExperience || !validStatus || !validGroup) return;

    const athletePayload: AthleteDTO = {
      name: name.value,
      experience: experience.value as "Beginner" | "Intermediate" | "Advanced",
      status: status.value as "Active" | "Inactive" | "Injured",
      groupId: Number(groupId.value)
    };

    try {
      const token = await getToken();
      if (!token) return;

      const newAthlete = await athleteRepo.createAthlete(athletePayload, token);

      onAddAthlete(newAthlete);
      refreshGroups();
      resetForm();
      setSuccess("Athlete added successfully");

      setTimeout(() => setSuccess(""), 5000);
    } catch (error: any) {
      setServerError(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#222527] text-white shadow-md rounded-lg m-10 p-10 max-w-md mx-auto"
    >
      <h2 className="flex font-bold text-[22px] mb-5 justify-center">Add New Athlete</h2>

      {/** NAME */}
      <label className="block pb-2">
        Name:
        <input
          value={name.value}
          onChange={(e) => name.setValue(e.target.value)}
          className="border rounded-md p-1 m-1 text-black"
          placeholder="Athlete Name"
        />
        {name.error && <p className="text-red-600 text-sm">{name.error}</p>}
        {serverError && <p className="text-red-600 text-sm font-medium mt-2">{serverError}</p>}
      </label>

      {/** EXPERIENCE */}
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
        {serverError && <p className="text-red-600 text-sm font-medium mt-2">{serverError}</p>}

      </label>
      
      {/** STATUS */}
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
        {serverError && <p className="text-red-600 text-sm font-medium mt-2">{serverError}</p>}
      </label>

      {/** GROUP */}
      <label className="block pb-2">
        Group:
        <select
          value={groupId.value}
          onChange={(e) => groupId.setValue(e.target.value)}
          className={`border rounded-md p-1 m-1 
            ${groupId.value === "" ? "text-gray-500" : "text-black"}`}
        >
          <option value="" disabled className="text-gray-500">
            Select a group
          </option>

          {groups.map((g) => (
            <option key={g.id} value={g.id} className="text-black">
              {g.name}
            </option>
          ))}
        </select>
        
        {groupId.error && (
          <p className="text-red-600 text-sm">{groupId.error}</p>
        )}
        {serverError && <p className="text-red-600 text-sm font-medium mt-2">{serverError}</p>}
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