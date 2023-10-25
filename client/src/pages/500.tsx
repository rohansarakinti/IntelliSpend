export default function Error500() {
    document.title = "Error - Server Not Responding"
    return (
        <div>
            <h1 className="text-3xl font-bold">500</h1>
            <p className="text-xl">Internal Server Error</p>
        </div>
    )
}