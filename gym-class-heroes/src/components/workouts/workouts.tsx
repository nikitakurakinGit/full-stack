// src/components/workouts/workouts.tsx

function WorkoutList({title, workouts }: {title: string; workouts: string[] }) {
    return (
        <section className="w-auto bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4">
            <div className="text-base text-[#3e4447] italic">
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                {workouts.map((w, index) => (
                    <p key={index} className="text-base text-[#3e4447] italic">
                        {w}
                    </p>
                ))}
            </div>
        </section>
    );
}

export default WorkoutList;