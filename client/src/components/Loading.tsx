import BounceLoader from "react-spinners/BounceLoader"

export default function Loading() {
    return (
        <div className="flex grow items-center justify-center">
            <BounceLoader 
                color="#72EC55"
                size={75}
            />
        </div>
    )
}