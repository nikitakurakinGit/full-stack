import { useEffect, useState } from "react";
import * as athleteService from "../services/athleteServices";
import * as athleteRepo from "../apis/athleteRepository"
import AthleteList from "../components/athletes/athletesList";
import AthleteForm from "../components/form/athleteForm";
import type { AthletesInterface } from "../components/interface/athletesInterface";
import { Modal } from "../components/layout/modal";
import { useAuth } from "@clerk/clerk-react";

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

  const { getToken } = useAuth();
  const [athletes, setAthletes] = useState<AthletesInterface[]>([]);
  const [showForm, setShowForm] = useState(false);

  // FETCH ATHLETES ON LOAD
  useEffect(() => {
    const fetchAthletes = async () => {
      const token = await getToken()
      if (!token) return

      const athletes = await athleteService.fetchAthletes(token);
      setAthletes([...athletes]);
    };
    fetchAthletes();
  }, []);

  // ADD ATHLETE 
  const onAddAthlete = async (newAthlete: AthletesInterface) => {
    setAthletes(prev => [...prev, newAthlete])
  }

  // REMOVE ATHLETE
  const onRemoveAthlete = async (athlete: AthletesInterface) => {
    try {
      const token = await getToken()
        if(!token) return
      await athleteRepo.deleteAthlete(athlete.id, token);

      setAthletes((prev) => prev.filter((a) => a.id !== athlete.id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full px-6 py-4 mx-auto">
      {/* ADD ATHLETE BUTTONS */}
      <div className="flex justify-left gap-4">
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-[#222527] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#5e656a]"
        >
          {showForm ? "Close Form" : "Add Athlete"}
        </button>
      </div>

      {/* ATHLETE FORM */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AthleteForm
            onAddAthlete={onAddAthlete}
          />
        </Modal>
      )}

      {/**
       * AthleteList Component
       *
       * athletes: the list of all athletes to display
       * groupsData: so it can show which group each athlete belongs to
       * onRemoveAthlete: a function to remove an athlete when the user clicks delete
       */}
      <AthleteList
        athletes={athletes}
        onRemoveAthlete={onRemoveAthlete}
      />
    </div>
  );
}
