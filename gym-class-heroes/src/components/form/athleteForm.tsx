import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import * as athleteService from "../../services/athleteServices";
import type { AthletesInterface } from "../interface/athletesInterface";
import type { GroupsInterface } from "../interface/groupsInterface";

type AthleteFormProps = {
  addAthlete: (athlete: AthletesInterface, groupId: string) => void;
  groupsData: GroupsInterface[];
};

export default function AthleteForm({ addAthlete, groupsData }: AthleteFormProps) {

  const name = useFormInput("", (value) => athleteService.validateAthleteName(value));
  const sport = useFormInput("", (value) => athleteService.validateAthleteSport(value));

  const experience = useFormInput("Beginner");
  const status = useFormInput("Active");

  const selectedGroupId = useFormInput("", (value) => {
    if (!value) return "Select a group";
    return null;
  });

  const [success, setSuccess] = useState("");

  function resetForm() {
    name.reset();
    sport.reset();
    experience.reset();
    status.reset();
    selectedGroupId.reset();
    setSuccess("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validName = name.validate();
    const validSport = sport.validate();
    const validGroup = selectedGroupId.validate();

    if (!validName || !validSport || !validGroup) return;

    const athleteId = Math.floor(1000 + Math.random() * 9000);

    const newAthlete: AthletesInterface = {
      id: athleteId,
      name: name.value,
      sport: sport.value,
      experience: experience.value as "Beginner" | "Intermediate" | "Advanced",
      status: status.value as "Active" | "Inactive" | "Injured",
    };

    addAthlete(newAthlete, selectedGroupId.value);

    resetForm();
    setSuccess("Athlete added successfully");

    setTimeout(() => setSuccess(""), 5000);
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
          value={name.value}
          onChange={(e) => name.setValue(e.target.value)}
          className="border rounded p-1 m-1 text-black"
        />
      </label>
      {name.error && <p className="text-red-600 text-sm">{name.error}</p>}

      <label>
        Sport:
        <input
          value={sport.value}
          onChange={(e) => sport.setValue(e.target.value)}
          className="border rounded p-1 m-1 text-black"
        />
      </label>
      {sport.error && <p className="text-red-600 text-sm">{sport.error}</p>}

      <label>
        Experience:
        <select
          value={experience.value}
          onChange={(e) =>
            experience.setValue(
              e.target.value as "Beginner" | "Intermediate" | "Advanced"
            )
          }
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
          value={status.value}
          onChange={(e) =>
            status.setValue(
              e.target.value as "Active" | "Inactive" | "Injured"
            )
          }
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
          value={selectedGroupId.value}
          onChange={(e) => selectedGroupId.setValue(e.target.value)}
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
      {selectedGroupId.error && (
        <p className="text-red-600 text-sm">{selectedGroupId.error}</p>
      )}

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