import Container from "../components/Container"
import Navbar from "../components/Navbar"

export default function Error500() {
    document.title = "Error - Server Not Responding"
    return (
        <Container centered>
            <Navbar />
            <div className="w-5/6 h-full flex flex-col items-center justify-center gap-y-4">
                <h1 className="text-6xl font-normal">500</h1>
                <h1 className="text-xl font-normal">This page is not responding. Please try again later.</h1>
            </div>
        </Container>
    )
}