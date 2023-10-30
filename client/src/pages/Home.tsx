import Navbar from "../components/Navbar"
import Container from "../components/Container"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import { Button } from "@nextui-org/react"
import { ChevronRight } from "react-bootstrap-icons"
import "./animations/index.css"

export default function Home() {
    document.title = "IntelliSpend"
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    })

    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container>
                <div className="flex flex-col items-center min-h-full">
                    <Navbar />
                    <div className="flex flex-col grow items-center justify-center w-5/6">
                        <div className="flex flex-col items-center gap-y-6 fadeIn w-full">
                            <h1 className="text-6xl font-normal text-center">IntelliSpend</h1>
                            <h1 className="text-3xl font-normal text-center">
                                The best way to manage your money.
                            </h1>
                            <Button className="text-white bg-black w-full md:w-1/2 lg:w-1/4" onClick={() => {
                                window.location.replace("/register")
                            }}>
                                <span className="w-full h-full flex flex-row items-center justify-center gap-x-2">
                                    <p>Get Started</p>
                                    <ChevronRight className="bounceRight" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}