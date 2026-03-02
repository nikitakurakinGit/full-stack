import type { AthletesInterface } from "../components/interface/athletesInterface";
import type { GroupsInterface } from "../components/interface/groupsInterface";

import AthleteList from "../components/athletes/athletesList";
import AthleteForm from "../components/form/athleteForm";


type AthletesPageProps = {
    title: string;
    athletes: AthletesInterface[];
    setAthletes: React.Dispatch<React.SetStateAction<AthletesInterface[]>>;
    groupsData: GroupsInterface[];
    addToGroup: (
        groupId: string,
        key: "athletesById",
        subjectId: number,
    ) => void;
    removeFromGroup: (
        groupId: string,
        key: "athletesById",
        subjectId: number,
    ) => void;
}

export default function AthletesPage({
    title,
    athletes,
    setAthletes,
    groupsData,
    addToGroup,
}: AthletesPageProps) {

    const onAddAthlete = (newAthlete: AthletesInterface, groupId: string) => {
        setAthletes(prev => [...prev, newAthlete]);
        addToGroup(groupId, "athletesById", newAthlete.id);
    };

    const onRemoveAthlete = (athlete: AthletesInterface) => {
        // remove from athlete list
        setAthletes(prev => prev.filter(currentAthlete => currentAthlete.id !== athlete.id));
    };

    return (
        <section className="athletes px-6 py-4 max-w-7xl mx-auto">
            <h2 className="text-[1.25rem] font-bold uppercase tracking-wide text-[#0c0e0e] drop-shadow mb-4">
                {title}
            </h2>

            <AthleteList
                athletes={athletes}
                groupsData={groupsData}
                onRemoveAthlete={onRemoveAthlete}
            />

            <AthleteForm
                groupsData={groupsData}
                addAthlete={onAddAthlete}
            />
        </section>
    );
}