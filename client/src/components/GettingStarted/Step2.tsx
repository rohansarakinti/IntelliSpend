import { useState, Dispatch, SetStateAction, useRef } from "react"
import "../../pages/animations/index.css"
import { Input, Card, CardBody, Checkbox, Button, CardFooter } from "@nextui-org/react"
import Container from "../Container"

export default function Step2(props: { income: string, know: boolean, setIncome: Dispatch<SetStateAction<string>>, setKnow: Dispatch<SetStateAction<boolean>>, setStep: Dispatch<SetStateAction<number>> }) {
    const [error, setError] = useState(false)
    const card = useRef<HTMLDivElement>(null)

    return (
        <Container>
            <div className="w-full h-full items-center justify-center flex">
                <Card className="w-5/6 py-10 items-center fadeIn" ref={card}>
                    <CardBody className="w-[95%] gap-y-5">
                        <h1 className="font-normal text-3xl">What is your monthly income?</h1>
                        <Input value={props.income} isInvalid={error} errorMessage={error ? "Please enter your monthly income" : ""} type="number" variant="bordered" size="lg" startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        } onInput={(e) => {
                            props.setIncome(e.currentTarget.value)
                            setError(false)
                        }} isDisabled={!props.know} />
                        <Checkbox isSelected={!props.know} onClick={() => { props.setKnow(prevState => !prevState); setError(false) }} isDisabled={props.income.length > 0} color="success">I do not know my monthly income / Prefer not to say</Checkbox>
                    </CardBody>
                    <CardFooter className="w-[95%] flex justify-end">
                        <Button className="text-white" color="success" onClick={() => {
                            if (props.know) {
                                if (props.income && Number(props.income) > 0) {
                                    card.current?.classList.add("slideRight")
                                    card.current?.addEventListener("animationend", () => {
                                        props.setStep(2)
                                    })
                                } else {
                                    setError(true)
                                }
                            } else {
                                card.current?.classList.add("slideRight")
                                card.current?.addEventListener("animationend", () => {
                                    props.setStep(3)
                                })
                            }
                        }}>Next</Button>
                    </CardFooter>
                </Card>
            </div>
        </Container >
    )
}