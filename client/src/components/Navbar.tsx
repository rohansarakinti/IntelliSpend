import { Navbar as Nav, NavbarBrand, NavbarContent, Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        if (window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")) {
            setLoggedIn(true)
        }
    })

    return (
        <Nav isBordered>
            <NavbarContent>
                <NavbarBrand className="select-none cursor-pointer" onClick={() => {
                    window.location.replace("/")
                }}><img src="/IntelliSpendFavicon.png" width={40}></img></NavbarBrand>
            </NavbarContent>
            <NavbarContent justify='end'>
                <Button onClick={() => {
                    if (loggedIn) {
                        window.location.replace("/dashboard")
                    } else {
                        window.location.replace("/login")
                    }
                }} color="success" className="text-white">
                    {loggedIn ? "Dashboard" : "Login"}
                </Button>
            </NavbarContent>
        </Nav>
    )
}