import { useState } from "react"
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import {Card, CardBody, Checkbox, Input, Button } from '@nextui-org/react'



export default function SaveStep({setSave, setStepNo}) {
    const [saveNotReq, setSaveNotReq] = useState(true)
    return (
        <Container>
            <Navbar loggedIn={false}/>
                <div className="grow w-full flex justify-center items-center">
                    <Card className="w-4/5 h-4/5 rounded ">
                    <h1 className="font-normal text-4xl underline p-10 ml-10">Let's Get Started!</h1>
                        <CardBody>
                            <div className="w-full h-full flex-col justify-center items-center">
                                <div className="w-5/6 h-5/6 flex-col px-7">
                                    <div className="flex-col w-full">
                                        <div className="flex w-full">
                                            <h1 className="font-normal text-3xl text-green-500 pl-7">Savings</h1>
                                        </div>
                                        <div className="w-full mt-7">
                                            <div className="w-full p-7">
                                                <Checkbox lineThrough color="success" isSelected={saveNotReq}  onClick={() => {
                                                    setSaveNotReq(prevState => !prevState)
                                                }}>I do not know how much of the income I want to save</Checkbox>
                                            </div>
                                            <div className="w-80 p-7">
                                                <Input isDisabled={saveNotReq} label="Save (%)" size="lg" variant="bordered" type="Income" onChange={(e) => {
                                                    setSave(e.target.value)

                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full px-7">
                                    <Button className='w-36 text-white hover:text-gray-300' color="success" onClick={() => {
                                        setStepNo("0")
                                    }} > Back </Button>
                                    <Button className='w-36 text-white hover:text-gray-300' color="success" onClick={() => {
                                        setStepNo("2")
                                    }} > Next </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
        </Container>
    )
}
