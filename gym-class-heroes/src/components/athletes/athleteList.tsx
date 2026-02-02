import type { AthletesInterface } from "../interface/athletesInterface";
import type { GroupsInterface } from "../interface/groupsInterface";

type AthleteListProps = {
    athletes: AthletesInterface[];
    groupsData: GroupsInterface[];
    onRemoveAthlete: (athlete: AthletesInterface) => void;
}

export default function AthleteList({
    athletes,
    groupsData,
    onRemoveAthlete
}: AthleteListProps) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w- full max-w-6xl mx-auto p-6">
            {athletes.map((athlete) => {
                // filter athlete from groupsData
                const athleteGroups = groupsData.filter((group) =>
                    group.athletesById.includes(athlete.id),
                );

                return (
                    <li
                        key={athlete.id}
                        className=" text-[#0c0e0e] p-4 rounded shadow-md border border-[#3e4447]"
                    >
                        <div>
                            <p className="font-semibold text-lg">
                                {athlete.name}
                            </p>
                            <p className="text-sm italic">
                                {athlete.sport} | {athlete.experience} |{" "}
                                {athlete.status}
                            </p>

                            <p className="text-sm font-semibold">
                                Groups:{" "}
                                {athleteGroups.length > 0
                                    ? athleteGroups
                                            .map((g) => g.name)
                                            .join(", ")
                                    : "None"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => onRemoveAthlete(athlete)}
                            className="bg-[#848e94] text-white text-sm px-3 py-1 rounded"
                        >
                            Remove Athlete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
