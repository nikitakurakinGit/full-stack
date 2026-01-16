export function Header({
    projectName,
    projectDescription
}: {
    projectName: string;
    projectDescription: string;
}) {
    return (
        <header className="w-auto bg-[#bcc8d0] text-[#0c0e0e] px-6 py-4 m-5">
            <h1 className="text-[2rem] font-bold">
                {projectName}
            </h1>
            <p className="text-base text-[#3e4447] italic">
                {projectDescription}
            </p>
        </header>
    );
}
