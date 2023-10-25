import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { useState } from 'react'

export default function Navbar(props: { loggedIn: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <Nav isBordered>
            <NavbarContent>
                <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" />
                <NavbarBrand onClick={() => {
                    window.location.replace("/")
                }}>ISFA</NavbarBrand>
            </NavbarContent>
        </Nav>
    )
}