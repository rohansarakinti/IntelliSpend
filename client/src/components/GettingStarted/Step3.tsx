import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react"
import "../../pages/animations/index.css"
import { Input, Card, CardBody, Button, CardFooter } from "@nextui-org/react"
import Container from "../Container"
import Swal from "sweetalert2"

export default function Step3(props: { save: string, income: string, setSave: Dispatch<SetStateAction<string>>, setStep: Dispatch<SetStateAction<number>>, submit: (param: boolean) => Promise<string> }) {
    const [error, setError] = useState(false)
    const [percentage, setPercentage] = useState("0")
    const [submitting, setSubmitting] = useState(false)
    const card = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (props.save.length > 0) {
            setPercentage((Number(props.save) / Number(props.income) * 100).toFixed(0))
        }
    }, [])

    return (
        <Container>
            <div className="w-full h-full items-center justify-center flex">
                <Card className="w-5/6 py-10 items-center fadeIn" ref={card}>
                    <CardBody className="w-[95%] gap-y-5">
                        <h1 className="font-normal text-3xl">How much do you want to save?</h1>
                        <div className="w-full md:flex md:gap-x-5 md:gap-y-0">
                            <Input value={props.save} isInvalid={error} errorMessage={error ? "Please enter a valid number" : ""} type="number" variant="bordered" size="lg" startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            } onInput={(e) => {
                                props.setSave(e.currentTarget.value)
                                if (e.currentTarget.value.length > 0) {
                                    setPercentage((Number(e.currentTarget.value) / Number(props.income) * 100).toFixed(0))
                                } else {
                                    setPercentage("")
                                }
                                setError(false)
                            }} />
                            <Input value={percentage} isInvalid={error} errorMessage={error ? "Please enter a valid percentage" : ""} type="number" variant="bordered" size="lg" className="mt-5 md:mt-0" endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">%</span>
                                </div>
                            } onInput={(e) => {
                                if (!(e.currentTarget.value.length > 3)) {
                                    setPercentage(e.currentTarget.value)
                                    if (e.currentTarget.value.length > 0) {
                                        props.setSave((Number(e.currentTarget.value) / 100 * Number(props.income)).toFixed(0))
                                    } else {
                                        props.setSave("")
                                    }
                                    setError(false)
                                }
                            }} />
                        </div>
                    </CardBody>
                    <CardFooter className="w-[95%] flex flex-row justify-between">
                        <Button className="text-white bg-black" onClick={() => {
                            props.setStep(1)
                        }}>Back</Button>
                        <Button isLoading={submitting} className="text-white" color="success" onClick={() => {
                            if (Number(percentage) > 100 || Number(props.save) > Number(props.income) || Number(percentage) < 0 || Number(props.save) < 0) {
                                alert("1")
                                setError(true)
                            } else if (!percentage || !props.save) {
                                alert("2")
                                setError(true)
                            } else {
                                setSubmitting(true)
                                props.submit(true).then((response) => {
                                     if (response === "success") {
                                        window.location.replace("/dashboard")
                                    } else {
                                        Swal.fire({
                                            title: "An error occurred while creating your budget.",
                                            text: "Please try again later",
                                            icon: "error",
                                        })
                                        setSubmitting(false)
                                    }
                                })
                            }
                        }}>{ submitting ? "" : "Create Budget" } </Button>
                    </CardFooter>
                </Card>
            </div>
        </Container >
    )
}