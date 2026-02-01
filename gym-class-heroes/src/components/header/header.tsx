export default function Header({
    projectName,
    projectDescription
}: {
    projectName: string;
    projectDescription: string;
}) {
    return (
        <header className="w-auto bg-gray-900 text-white px-10 py-10">
            <h1 className="text-[2rem] font-bold">
                {projectName}
            </h1>
            <p className="text-base text-gray-300 italic">
                {projectDescription}
            </p>
        </header>
    );
}