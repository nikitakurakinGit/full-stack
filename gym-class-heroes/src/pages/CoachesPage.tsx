import type { CoachInterface } from "../components/interface/coachesInterface";

export default function CoachesPage({ coaches }: { coaches: CoachInterface[] }) {
    return (
        <section className="bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4">
            <div>
                {coaches.map((coach) => (
                    <div key={coach.id}>
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-lg font-semibold drop-shadow">{coach.name}: </h4>
                            <span className="text-m font-medium mb-2">{coach.title}</span>
                        </div>
                        <div>
                            {coach.athletes.map((athlete) => (
                            <h6 key={coach.id} className="text-base text-[#3e4447] italic">{athlete}</h6>
                             ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

