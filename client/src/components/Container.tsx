import { ReactNode } from "react"

interface Props {
    children: ReactNode
    centered?: boolean
}

export default function Container(props: Props) {
    return (
        <div className={`w-screen h-screen flex flex-col max-w-full overflow-x-hidden ${props.centered ? "items-center" : ""}`}>
            {props.children}
        </div>
    )
}