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
    const { groupsData, error, addToGroup, removeFromGroup } = useGroupData();

    // FETCH ATHLETES ON LOAD
    useEffect(() => {
        const fetchAthletes = async () => {
            const data = await athleteService.fetchAthletes();
            setAthletes([...data]);
        };
        fetchAthletes();
    }, []);

    // ADD ATHLETE
    const onAddAthlete = async (newAthlete: AthletesInterface, groupId: string) => {
        try {
            const createdAthlete = await athleteService.createAthlete(newAthlete);

            if (typeof createdAthlete === "string") {
                console.error(createdAthlete);
                return;
            }

            setAthletes(prev => [...prev, newAthlete]);

            // ADD ATHLETE TO GROUP
            addToGroup(groupId, "athletesById", newAthlete.id);

        } catch (err) {
            console.error(err);
        }
    };

    // REMOVE ATHLETE
    const onRemoveAthlete = async (athlete: AthletesInterface) => {
        try {
            const deletedAthleteId = await athleteService.deleteAthlete(athlete.id);

            // REMOVE ATHLETE FROM THEIR GROUP
            groupsData.forEach((group) => {
                if (group.athletesById.includes(athlete.id)) {
                    removeFromGroup(group.id, "athletesById", athlete.id);
                }
            });

            // REMOVE ATHLETE FROM ATHLETE LIST
            setAthletes(prev =>
                prev.filter(athlete => athlete.id !== deletedAthleteId)
            );

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col w-full px-6 py-4 max-w-7xl mx-auto">
						{/**
              * AthleteList Component
              *
              * athletes: the list of all athletes to display
              * groupsData: so it can show which group each athlete belongs to
              * onRemoveAthlete: a function to remove an athlete when the user clicks delete
              */}
            <AthleteList
                athletes={athletes}
                groupsData={groupsData}
                onRemoveAthlete={onRemoveAthlete}
            />

						{/**
              * AthleteForm Component
              *
              * addAthlete: a function to create a new athlete
              * groupsData: so the form can show the group dropdown
              *
              * AthleteForm handles the input fields and validation.
              * When the form submits, it sends the new athlete back to this page.
              */}
            <AthleteForm
                addAthlete={onAddAthlete}
                groupsData={groupsData}
            />

            {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}