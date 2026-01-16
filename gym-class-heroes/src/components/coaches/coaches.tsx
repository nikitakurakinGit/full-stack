import type { CoachModel } from "../interface/coaches";

function Coaches({id, name, title, athletes}: CoachModel) {
    return (
        <section className="bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4">
            <div>
                <div className="flex items-baseline gap-2">
                    <h4 className="text-lg font-semibold drop-shadow">{name}: </h4>
                    <span className="text-m font-medium mb-2">{title}</span>
                </div>
                {athletes.map((athlete) => (
                    <h6 key={id} className="text-base text-[#3e4447] italic">{athlete}</h6>
                ))}
            </div>
        </section>
    )
}

export default Coaches;