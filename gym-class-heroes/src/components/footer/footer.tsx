// src/components/footer/Footer.tsx

export default function Footer({ names }: { names: string[] }) {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-4xl mx-auto text-center">
                <h4 className="text-lg font-semibold mb-4">Project Team Members</h4>
                {names.map((n, index) => (
                    <p key={index} className="text-gray-300">
                        {n}
                    </p>
                ))}
            </div>
        </footer>
    );
}