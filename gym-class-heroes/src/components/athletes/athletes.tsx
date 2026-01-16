import type { Athletes } from "../interface/athletes";

export function AthleteList(
    { title, athlete }: { title: string; athlete: Athletes[] }
) {
    return (
        <section className="athletes px-6 py-4">
            <h2 className="text-[1.25rem] font-bold drop-shadow">{title}</h2>

            <ul className="px-4">
                {athlete.map(athlete => (
                    <li key={athlete.id}>
                        <p className="font-semibold text-[1rem]">{athlete.name}</p>
                        <p className="px-4 italic text-[0.875rem]">
                            {athlete.sport} | {athlete.experience} | {athlete.status}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}


export default AthleteList;
