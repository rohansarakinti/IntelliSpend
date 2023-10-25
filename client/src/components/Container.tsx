import { ReactNode } from "react";

interface Props {
    children: ReactNode
    centered?: boolean
}

export default function Container(props: Props) {
    return (
        <div className={`w-screen h-screen flex flex-col ${props.centered ? "items-center" : ""}`}>
            {props.children}
        </div>
    )
}