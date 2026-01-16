
function Title({ text }: {text: string}) {
    return (
        <>
            <div className="flex justify-center justify-items-center border-black">
                <h1>{text}</h1>
            </div>
        </>
    )
}

export default Title;