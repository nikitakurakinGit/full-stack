import type { AthletesInterface } from "../interface/athletesInterface";
import type { GroupsInterface } from "../interface/groupsInterface";

type AthleteListProps = {
  athletes: AthletesInterface[];
  groupsData: GroupsInterface[];
  onRemoveAthlete: (athlete: AthletesInterface) => void;
};

export default function AthleteList({
  athletes,
  groupsData,
  onRemoveAthlete,
}: AthleteListProps) {
  return (
  <ul className="
    grid 
    grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
    gap-6 
    p-6
    ">
      {athletes.map((athlete) => {
        // filter athlete from groupsData
        const athleteGroup = groupsData.find(
          (group) => group.name === athlete.group,
        );

        return (
          <li
            key={athlete.id}
            className=" text-[#0c0e0e] p-5 rounded-lg shadow-md border border-[#3e4447]"
          >
            <div>
              <p className="font-semibold text-lg">{athlete.name}</p>
              <p className="text-sm italic">
                {athlete.experience} | {athlete.status}
              </p>

              <p className="text-sm font-semibold pb-3">
                Group: {athleteGroup ? athleteGroup.name : "None"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemoveAthlete(athlete)}
              className="bg-[#848e94] text-white text-sm px-3 py-1 rounded-md hover:bg-[#5e656a]"
            >
              Remove Athlete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
