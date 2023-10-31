import { useState, useEffect } from 'react'
import client from '../components/instance'
import Container from '../components/Container'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { Card, CardBody, Button, Input, Checkbox } from "@nextui-org/react"
import { EyeSlash, Eye } from 'react-bootstrap-icons'
import "./animations/index.css"
import Swal from 'sweetalert2'

export default function LoginPage() {
    document.title = "Login"
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")) {
            window.location.replace("/dashboard")
        } else {
            setLoading(false)
        }
    }, [])

    const handleSubmit = () => {
        setSubmitting(true)
        client.post("/login", {
            email: email,
            password: password
        }).then((response) => {
            if (!response.data.error) {
                if (rememberMe) {
                    window.localStorage.setItem("uid", response.data.uid)
                } else {
                    window.sessionStorage.setItem("uid", response.data.uid)
                }
                window.location.replace("/dashboard")
            } else {
                Swal.fire({
                    title: "Incorrect username/password",
                    icon: "error"
                })
                setSubmitting(false)
            }
        }).catch((error) => {
            console.error(error.message)
            setSubmitting(false)
        })
    }
    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container>
                <Navbar />
                <div className="grow w-full flex">
                    <Card className="w-full h-full rounded-none md:w-1/2 lg:w-2/5 md:rounded-r-lg">
                        <CardBody>
                            <div className="w-full h-full flex justify-center">
                                <div className="w-5/6 flex flex-col items-center justify-center h-full gap-y-5">
                                    <h1 className="font-normal text-4xl">Log In</h1>
                                    <Input label="Email" type="email" size="sm" variant='bordered' onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                    <Input label="Password" size="sm" variant="bordered" type={visible ? "text" : "password"} endContent={
                                        <button onClick={() => {
                                            setVisible(prevState => !prevState)
                                        }}>
                                            {
                                                visible ? <EyeSlash /> : <Eye />
                                            }
                                        </button>
                                    } onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} />
                                    <Checkbox color='success' isSelected={rememberMe} onClick={() => {
                                        setRememberMe(prevState => !prevState)
                                    }}>Remember Me</Checkbox>
                                    <Button className="w-full text-white" color="success" isLoading={submitting} onClick={handleSubmit}>
                                        {submitting ? "" : "Login"}
                                    </Button>
                                    <span className="flex gap-x-2">
                                        <p>Don't have an account?</p>
                                        <a
                                            className="underline text-green-500 hover:text-green-400"
                                            href="/register"
                                            unselectable="on"
                                        >
                                            Register now
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="hidden grow md:flex justify-center items-center">
                        <img src="/IntelliSpendLogoFinal.png" className="fadeIn"></img>
                    </div>
                </div>
            </Container>
        )
    }
}