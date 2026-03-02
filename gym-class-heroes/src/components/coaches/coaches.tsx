import type { CoachInterface } from "../interface/coachesInterface";

type CoachesProps = {
        onRemoveCoach: (coach: CoachInterface) => void;
        coaches: CoachInterface[];
    }

function Coaches({ coaches, onRemoveCoach }: CoachesProps) {

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w- full max-w-6xl mx-auto p-6">
            {coaches.map((coach) => (
                <div className="p-4 rounded shadow-md border border-[#3e4447]" key={coach.id}>
                    <div className="flex flex-col items-baseline gap-2">
                        <h4 className="text-lg font-semibold drop-shadow">{coach.name}</h4>
                        <div>
                            <span className="text-sm italic mb-2">{coach.title} | </span>
                            <span className="text-sm italic mb-2">{coach.group}</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveCoach(coach)}
                        className="border border-black rounded py-2 px-3 mt-5
                        bg-white text-sm hover:bg-gray-100 active:scale-95
                        transition">Remove Coach</button>
                </div>
            ))}
        </section>
    )
}

export default Coaches;