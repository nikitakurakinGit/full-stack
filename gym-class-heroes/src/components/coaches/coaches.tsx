

function Coaches({name, title, athletes}: {name: string, title: string, athletes: string[]}) {
    return (
        <section className="w-auto bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4">
            <div>
                <h4 className="text-lg font-semibold">{name}: </h4>
                <h5 className="text-m font-medium mb-2">{title}</h5>
                {athletes.map((athlete, index) => (
                    <h6 key={index} className="text-base text-[#3e4447] italic">{athlete}</h6>
                ))}
            </div>
        </section>
    )
}

export default Coaches;