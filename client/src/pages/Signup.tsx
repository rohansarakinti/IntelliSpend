import client from "../components/instance";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { Card, CardBody, Input, Button, Checkbox } from "@nextui-org/react";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import Validator from "../components/validator";

export default function Signup() {
    document.title = "IntelliSpend - Register"
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [visible, setVisible] = useState({
        password: false,
        confirmPassword: false
    })
    const [error, setError] = useState({
        email: {
            error: false,
            errorMessage: ""
        },
        confirmEmail: {
            error: false,
            errorMessage: ""
        },
        password: {
            error: false,
            errorMessage: ""
        },
        confirmPassword: {
            error: false,
            errorMessage: ""
        }
    })
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
        const { error, errors } = Validator(email, password, confirmEmail, confirmPassword)
        if (!error) {
            client.post("/create_user", {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.error) {
                    setSubmitting(false)
                    console.error(response.data.errorMessage)
                } else {
                    window.location.replace("/dashboard")
                }
            }).catch((error) => {
                console.error(error.message)
            })
        } else {
            setError(errors)
            setSubmitting(false)
        }
    }

    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container centered>
                <Navbar loggedIn={false}></Navbar>
                <div className="w-full md:w-5/6 h-full flex flex-row-reverse items-center">
                    <Card className="w-full h-full rounded-none md:rounded-lg md:w-2/3 md:h-[90%] md:rounded-r-lg">
                        <CardBody>
                            <div className="w-full h-full flex justify-center">
                                <div className="w-5/6 flex flex-col items-center justify-center h-full gap-y-5">
                                    <h1 className="font-normal text-4xl">Register</h1>
                                    <Input label="Email" type="email" size="sm" variant='bordered' isInvalid={error.email.error} errorMessage={error.email.errorMessage} onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError(prevState => ({
                                            ...prevState,
                                            email: {
                                                error: false,
                                                errorMessage: ""
                                            }
                                        }))
                                    }} />
                                    <Input label="Confirm Email" type="email" size="sm" variant='bordered' isInvalid={error.confirmEmail.error} errorMessage={error.confirmEmail.errorMessage} onChange={(e) => {
                                        setConfirmEmail(e.target.value)
                                        setError(prevState => ({
                                            ...prevState,
                                            confirmEmail: {
                                                error: false,
                                                errorMessage: ""
                                            }

                                        }))
                                    }} />
                                    <Input label="Password" size="sm" variant="bordered" isInvalid={error.password.error} errorMessage={error.password.errorMessage} type={visible.password ? "text" : "password"} endContent={
                                        <button onClick={() => {
                                            setVisible(prevState => ({
                                                ...prevState,
                                                password: !prevState.password
                                            }))
                                        }}>
                                            {
                                                visible.password ? <EyeSlash /> : <Eye />
                                            }
                                        </button>
                                    } onChange={(e) => {
                                        setPassword(e.target.value)
                                        setError(prevState => ({
                                            ...prevState,
                                            password: {
                                                error: false,
                                                errorMessage: ""
                                            }
                                        }))
                                    }} />
                                    <Input label="Confirm Password" size="sm" variant="bordered" isInvalid={error.confirmPassword.error} errorMessage={error.confirmPassword.errorMessage} type={visible.confirmPassword ? "text" : "password"} endContent={
                                        <button onClick={() => {
                                            setVisible(prevState => ({
                                                ...prevState,
                                                password: !prevState.confirmPassword
                                            }))
                                        }}>
                                            {
                                                visible.confirmPassword ? <EyeSlash /> : <Eye />
                                            }
                                        </button>
                                    } onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        setError(prevState => ({
                                            ...prevState,
                                            confirmPassword: {
                                                error: false,
                                                errorMessage: ""
                                            }
                                        }))
                                    }} />
                                    <Checkbox color="success" isSelected={rememberMe} onClick={() => {
                                        setRememberMe(prevState => !prevState)
                                    }}>Remember Me</Checkbox>
                                    <Button className="w-full text-white" color="success" isLoading={submitting} onClick={handleSubmit}>
                                        {submitting ? "" : "Register"}
                                    </Button>
                                    <span className="flex gap-x-2">
                                        <p>Already have an account?</p>
                                        <a
                                            className="underline text-green-500 hover:text-green-400"
                                            href="/login"
                                            unselectable="on"
                                        >
                                            Log in
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        )
    }
}