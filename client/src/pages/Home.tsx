import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useState, useEffect } from "react";
import client from "../components/instance";
import Loading from "../components/Loading";

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        client.get("/checkLogin").then((response) => {
            setLoggedIn(response.data.loggedIn)
            setLoading(false)
        }).catch((error) => {
            console.error(error)
        })
        setLoading(false)
    }, [])

    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container>
                <Navbar loggedIn={loggedIn} />
            </Container>
        )
    }
}