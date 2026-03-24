import { useEffect, useState } from "react";
import * as athleteService from "../services/athleteServices";

import AthleteList from "../components/athletes/athletesList";
import AthleteForm from "../components/form/athleteForm";

import { useGroupData } from "../hooks/useGroupData";
import type { AthletesInterface } from "../components/interface/athletesInterface";

export default function AthletesPage() {
  /**
   * AthletesPage Component
   *
   * This page controls all athlete data in the app.
   * It loads athletes from AthleteService when the page starts.
   * It uses the custom hook useGroupData() to get groups and update group
   * It passes athletes to athleteList so the list can display them.
   * It passes addAthlete to athleteForm so the form can create new athletes.
   *
   */

  const [athletes, setAthletes] = useState<AthletesInterface[]>([]);
  const { groups, error } = useGroupData();

  const [showForm, setShowForm] = useState(false);

  // FETCH ATHLETES ON LOAD
  useEffect(() => {
    const fetchAthletes = async () => {
      const data = await athleteService.fetchAthletes();
      setAthletes([...data]);
    };
    fetchAthletes();
  }, []);

  // ADD ATHLETE (group is now a NAME)
  const onAddAthlete = async (newAthlete: AthletesInterface) => {
    try {
      const createdAthlete = await athleteService.createAthlete(newAthlete);

      if (typeof createdAthlete === "string") {
        console.error(createdAthlete);
        return;
      }

      setAthletes((prev) => [...prev, newAthlete]);
    } catch (err) {
      console.error(err);
    }
  };

  // REMOVE ATHLETE
  const onRemoveAthlete = async (athlete: AthletesInterface) => {
    try {
      await athleteService.deleteAthlete(athlete.id);

      setAthletes((prev) => prev.filter((a) => a.id !== athlete.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full px-6 py-4 mx-auto">
      {/**
       * AthleteList Component
       *
       * athletes: the list of all athletes to display
       * groupsData: so it can show which group each athlete belongs to
       * onRemoveAthlete: a function to remove an athlete when the user clicks delete
       */}
      <AthleteList
        athletes={athletes}
        groupsData={groups}
        onRemoveAthlete={onRemoveAthlete}
      />
      
      {/* ADD ATHLETE BUTTONS */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-[#222527] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#5e656a]"
        >
          {showForm ? "Close Form" : "Add Athlete"}
        </button>
      </div>

      {/* ATHLETE FORM */}
      {showForm && (
        <AthleteForm
          addAthlete={onAddAthlete}
          groupsData={groups}
        />
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
