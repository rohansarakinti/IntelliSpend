import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Home() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    })

    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container>
                <Navbar />
            </Container>
        )
    }
}