import Nav from "../nav/nav";

export default function Header({
    projectName,
    projectDescription
}: {
    projectName: string;
    projectDescription: string;
}) {
    return (
        <header className="flex w-auto bg-gray-900 text-white px-10 py-10 mb-14 sticky top-0 z-50">
            <div>
                <h1 className="text-[2rem] font-bold">
                    {projectName}
                </h1>
                <p className="text-base text-gray-300 italic">
                    {projectDescription}
                </p>
            </div>
            <div className="flex-1 flex justify-end items-center">
                <Nav/>
            </div>
        </header>
    );
}