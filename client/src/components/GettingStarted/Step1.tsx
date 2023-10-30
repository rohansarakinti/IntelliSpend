import Container from "../Container"
import "../../pages/animations/index.css"
import { Button } from "@nextui-org/react"
import { ChevronRight } from "react-bootstrap-icons"
import { useRef, SetStateAction, Dispatch } from "react"

export default function Step1(props: { setStep: Dispatch<SetStateAction<number>> }) {
    const div = useRef<HTMLDivElement>(null)

    return (
        <Container centered>
            <div className="w-5/6 h-full flex flex-col items-center justify-center gap-y-4" ref={div}>
                <div className="w-full flex flex-col items-center justify-center fadeIn">
                    <h1 className="font-normal text-5xl md:text-7xl lg:text-8xl text-center pb-10">Let's Start<br></br>Saving</h1>
                    <Button className="text-white bg-black w-full md:w-1/2" size="lg" onClick={() => {
                        div.current?.classList.add("slideRight")
                        div.current?.addEventListener("animationend", () => {
                            props.setStep(1)
                        })
                    }}>
                        <span className="w-full h-full flex flex-row items-center justify-center gap-x-2">
                            <p>Get Started</p>
                            <ChevronRight className="bounceRight" />
                        </span>
                    </Button>
                </div>
            </div>
        </Container>
    )
}