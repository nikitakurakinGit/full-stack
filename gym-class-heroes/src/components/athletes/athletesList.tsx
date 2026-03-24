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
  <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 pt-10">

      {athletes.map((athlete) => {
        // filter athlete from groupsData
        const athleteGroup = groupsData.find(
          (group) => group.name === athlete.group,
        );

        return (
          <li
            key={athlete.id}
            className=" text-[#0c0e0e] p-5 rounded-lg shadow-lg border border-gray-900"
          >
            <div>
              <div className="flex justify-between items-start">
                <p className="truncate max-w-full font-semibold text-lg">{athlete.name}</p>

                <button
                  type="button"
                  onClick={() => onRemoveAthlete(athlete)}
                  className="bg-[#848e94] text-white text-sm px-3 py-1 rounded-md hover:bg-[#5e656a]"
                >
                  X
                </button>
              </div>
              <p className="text-md italic">
                {athlete.experience} | {athlete.status}
              </p>

              <p className="text-md font-semibold pb-3">
                Group: {athleteGroup ? athleteGroup.name : "None"}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
