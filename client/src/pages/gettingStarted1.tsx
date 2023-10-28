import { useState,  } from "react"
import IncomeStep from "../components/incomeStep"
import SaveStep from "../components/saveStep"
import SpendStep from "../components/spendStep"


export default function GettingStarted1() {
    document.title = "Intellispend - Getting Started"
    const [income, setIncome] = useState('') //their income
    const [stepNo, setStepNo] = useState('1')
    const [save, setSave] = useState('') //percentage of the income they want to save
    const [spend, setSpend] = useState('') //If they didnt give save percentage, then they give spending amount
    
    if (stepNo == '0'){
        return (
        <div>
            <IncomeStep  setIncome={setIncome} setStepNo={setStepNo}/>
            <p>{stepNo}</p>
        </div>
            
            )
    }
    else if (stepNo == '1') {
        return (
            <div>
                <SaveStep setSave={setSave} setStepNo={setStepNo}/>
                <p>{stepNo}</p>
            </div>
        )
    }
    else if (stepNo == '2'){
        return (
            <div>
                <SpendStep setSpend={setSpend} setStepNo={setStepNo} />
            </div>
        )
    }
}
