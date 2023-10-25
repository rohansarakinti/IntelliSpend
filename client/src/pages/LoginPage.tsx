import { useState, useEffect } from 'react'
import client from '../components/instance'
import Container from '../components/Container'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { Card, CardBody, Button, Input, Checkbox } from "@nextui-org/react"
import { EyeSlash, Eye } from 'react-bootstrap-icons'

export default function LoginPage() {
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    useEffect(() => {
        client.get("/checkLogin").then((res) => {
            if (res.data.loggedIn) {
                window.location.replace("/dashboard")
            } else {
                setLoading(false)
            }
        }).catch((error) => {
            console.error(error.message)
        })
        setLoading(false)
    }, [])

    const handleSubmit = () => {
        setSubmitting(true)
        client.post("/login", {
            email: email,
            password: password,
            rememberMe: rememberMe
        }).then((response) => {
            if (response.data.success) {
                window.location.replace("/dashboard")
            } else {
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
                <Navbar loggedIn={false} />
                <div className="grow w-full flex">
                    <Card className="w-full h-full rounded-none lg:w-1/3 lg:rounded-r-lg">
                        <CardBody>
                            <div className="w-full h-full flex justify-center">
                                <div className="w-5/6 flex flex-col items-center justify-center h-full gap-y-5">
                                    <h1 className="font-normal text-4xl">Login</h1>
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
                                    <Checkbox isSelected={rememberMe} onClick={() => {
                                        setRememberMe(prevState => !prevState)
                                    }}>Remember Me</Checkbox>
                                    <Button className="w-full text-white" color="success" isLoading={submitting} onClick={handleSubmit}>
                                        {submitting ? "" : "Login"}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        )
    }
}