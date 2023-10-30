import { useState, Dispatch, SetStateAction, useRef } from "react"
import "../../pages/animations/index.css"
import { Input, Card, CardBody, Button, CardFooter } from "@nextui-org/react"
import Container from "../Container"
import Swal from "sweetalert2"

export default function Step4(props: { spend: string, setSpend: Dispatch<SetStateAction<string>>, setStep: Dispatch<SetStateAction<number>>, submit: (param: boolean) => Promise<string> }) {
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const card = useRef<HTMLDivElement>(null)

    return (
        <Container>
            <div className="w-full h-full items-center justify-center flex">
                <Card className="w-5/6 py-10 items-center fadeIn" ref={card}>
                    <CardBody className="w-[95%] gap-y-5">
                        <h1 className="font-normal text-3xl">How much do you want to spend?</h1>
                        <Input value={props.spend} isInvalid={error} errorMessage={error ? "Please enter a valid number" : ""} type="number" variant="bordered" size="lg" startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        } onInput={(e) => {
                            props.setSpend(e.currentTarget.value)
                            setError(false)
                        }} />
                    </CardBody>
                    <CardFooter className="w-[95%] flex flex-row justify-between">
                        <Button className="text-white bg-black" onClick={() => {
                            props.setStep(1)
                        }}>Back</Button>
                        <Button isLoading={submitting} className="text-white" color="success" onClick={() => {
                            if (props.spend.length === 0 || Number(props.spend) < 0) {
                                setError(true)
                            } else {
                                setSubmitting(true)
                                props.submit(false).then((response) => {
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
                        }}>{submitting ? "" : "Create Budget"} </Button>
                    </CardFooter>
                </Card>
            </div>
        </Container >
    )
}