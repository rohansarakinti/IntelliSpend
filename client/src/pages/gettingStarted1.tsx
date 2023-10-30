import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import Container from "../components/Container"
import client from "../components/instance"
import Step1 from "../components/GettingStarted/Step1"
import Step2 from "../components/GettingStarted/Step2"
import Step3 from "../components/GettingStarted/Step3"
import Step4 from "../components/GettingStarted/Step4"


export default function GettingStarted1() {
    document.title = "Getting Started"
    const [loading, setLoading] = useState(true)
    const [income, setIncome] = useState('') //their income
    const [step, setStep] = useState(0)
    const [save, setSave] = useState('0') //percentage of the income they want to save
    const [know, setKnow] = useState(true)
    const [spend, setSpend] = useState('') //If they didnt give save percentage, then they give spending amount

    useEffect(() => {
        if (!(window.localStorage.getItem("uid")) && !(window.sessionStorage.getItem("uid"))) {
            window.location.replace("/login")
        } else {
            client.post("/getData", {
                uid: window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
            }).then((response) => {
                if (response.data.budget) {
                    window.location.replace("/dashboard")
                } else {
                    setLoading(false)
                }
            }).catch((error) => {
                console.error(error.message)
                window.location.replace("/Error500")
            })
        }
    })

    const handleSubmit = async (hasIncome: boolean): Promise<string> => {
        if (hasIncome) {
            const budget = Number(income) - Number(save)
            const uid = window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
            const response = await client.post("/setBudget", {
                uid: uid,
                budget: budget
            })
            if (response.data.error) {
                console.error(response.data.errorMessage)
                return "error"
            } else {
                return "success"
            }
        } else {
            const budget = Number(spend)
            const uid = window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
            const response = await client.post("/setBudget", {
                uid: uid,
                budget: budget
            })
            if (response.data.error) {
                console.error(response.data.errorMessage)
                return "error"
            } else {
                return "success"
            }
        }
    }

    if (loading) {
        return <Container><Loading /></Container>
    } else if (step === 0) {
        return <Step1 setStep={setStep} />
    } else if (step === 1) {
        return <Step2 income={income} know={know} setIncome={setIncome} setKnow={setKnow} setStep={setStep} />
    } else if (step === 2) {
        return <Step3 save={save} income={income} setSave={setSave} setStep={setStep} submit={handleSubmit} />
    } else if (step === 3) {
        return <Step4 spend={spend} setSpend={setSpend} setStep={setStep} submit={handleSubmit} />
    }
}
