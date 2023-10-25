import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react'
import { useState } from 'react'

export default function Navbar(props: { loggedIn: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


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
                    if (props.loggedIn) {
                        window.location.replace("/dashboard")
                    } else {
                        window.location.replace("/login")
                    }
                }} color="success" className="text-white">
                    {props.loggedIn ? "Dashboard" : "Login"}
                </Button>
            </NavbarContent>
        </Nav>
    )
}