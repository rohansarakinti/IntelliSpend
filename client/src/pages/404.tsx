import Container from "../components/Container"
import Navbar from "../components/Navbar"

export default function Error404() {
    document.title = "Error - Page Not Found"
    return (
        <Container centered>
            <Navbar />
            <div className="w-5/6 h-full flex flex-col items-center justify-center gap-y-4">
                <h1 className="text-6xl font-normal">404</h1>
                <h1 className="text-xl font-normal">We couldn't find the page you are looking for.</h1>
            </div>
        </Container>
    )
}