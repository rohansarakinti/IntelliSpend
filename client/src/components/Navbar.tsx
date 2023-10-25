import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        if (window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")) {
            setLoggedIn(true)
        }
    })

    return (
        <Nav isBordered>
            <NavbarContent>
                <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" />
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