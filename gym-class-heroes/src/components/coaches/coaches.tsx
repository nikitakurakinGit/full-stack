import type { CoachInterface } from "../interface/coachesInterface";

type CoachesProps = {
        onRemoveCoach: (coach: CoachInterface) => void;
        coaches: CoachInterface[];
    }

function Coaches({ coaches, onRemoveCoach }: CoachesProps) {

    return (
        <section className="flex flex-wrap justify-center bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4 gap-20 w-full max-w-xl mx-auto border-2 rounded">
            {coaches.map((coach) => (
                <div key={coach.id}>
                    <div className="flex flex-col items-baseline gap-2">
                        <h4 className="text-lg font-semibold drop-shadow">{coach.name}: </h4>
                        <span className="text-m font-medium mb-2">Title: {coach.title}</span>
                        <span className="text-m font-medium mb-2">Group: {coach.group}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveCoach(coach)}
                        className="border border-black rounded py-2 px-3
                        bg-white hover:bg-gray-100 active:scale-95
                        transition">Remove</button>
                </div>
            ))}
        </section>
    )
}

export default Coaches;