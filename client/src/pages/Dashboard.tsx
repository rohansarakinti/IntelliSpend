import Container from "../components/Container"
import Loading from "../components/Loading"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import client from "../components/instance"
import { usePlaidLink } from "react-plaid-link"
import getLinkToken from "../components/functions/getLinkToken"
import GetPercentage from "../components/functions/GetPercentage"
import Normalize from "../components/functions/Normalize"
import getColor from "../components/functions/getColor"
import { Card, CardBody, Button, Tabs, Tab, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, Divider } from "@nextui-org/react"
import getTotal from "../components/functions/getTotal"
import { ArrowClockwise } from "react-bootstrap-icons"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
    document.title = "Dashboard"
    const [loading, setLoading] = useState(true)
    const [hasToken, setHasToken] = useState(false)
    const [token, setToken] = useState("")
    const [total, setTotal] = useState(0)
    const [transactions, setTransactions] = useState<any>([])
    const [refreshing, setRefreshing] = useState(true)
    const [budget, setBudget] = useState<any>()
    const [order, setOrder] = useState<string[] | null>(null)
    const [percent, setPercent] = useState<any>(null)
    const [data, setData] = useState<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number }[] } | null>(null)
    useEffect(() => {
        if (window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")) {
            client.post("/getData", {
                uid: window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
            }).then((response) => {
                setLoading(false)
                if (!response.data.budget) {
                    window.location.replace("/getStarted")
                } else {
                    setBudget(response.data.budget)
                    if (response.data.hasToken) {
                        setHasToken(true)
                        getTransactions().then((response) => {
                            setTotal(getTotal(response))
                            setRefreshing(false)
                        })
                    } else {
                        getLinkToken(window.localStorage.getItem("uid")! || window.sessionStorage.getItem("uid")!).then((token) => {
                            setRefreshing(false)
                            setToken(token)
                        })
                    }
                }
            })
        } else {
            window.location.replace("/login")
        }
    }, [])
    const { open, ready } = usePlaidLink({
        token: token,
        // @ts-ignore
        onSuccess: (public_token, metadata) => {
            client.post("/get_access_token", {
                public_token: public_token,
                uid: window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
            }).then((response) => {
                if (response.data.error) {
                    console.error(response.data.errorMessage)
                } else {
                    window.location.reload()
                }
            }).catch((error) => {
                console.error(error.message)
            })
        },
        // @ts-ignore
        onExit: (err, metadata) => {
            if (err !== null) {
                console.error(err)
            }
        },
        // @ts-ignore
        onEvent: (eventName, metadata) => { },
    })

    const getTransactions = async () => {
        const response = await client.post("/getTransactions", {
            uid: window.localStorage.getItem("uid") || window.sessionStorage.getItem("uid")
        })
        setTransactions(response.data.transactions)
        const percentage: { [key: string]: number } = GetPercentage(response.data.transactions)
        const labels: string[] = []
        const data: number[] = []
        const colors: string[] = []
        Object.keys(percentage).forEach((key) => {
            if (percentage[key] > 0) {
                labels.push(Normalize(key.toUpperCase()))
                data.push(percentage[key])
                colors.push(getColor(key.toUpperCase()))
            }
        })
        setPercent(percentage)
        setOrder(Object.keys(percentage).sort((a, b) => { return percentage[b] - percentage[a] }))
        console.log(colors)
        setData({
            labels: labels,
            datasets: [
                {
                    label: "Budget",
                    data: data,
                    backgroundColor: colors,
                    borderColor: ["#000000"],
                    borderWidth: 1,
                }
            ]
        })
        return response.data.transactions
    }

    const refresh = async () => {
        setRefreshing(true)
        const response = await getTransactions()
        setTotal(getTotal(response))
        setRefreshing(false)
    }

    if (loading) {
        return <Container><Loading /></Container>
    } else {
        return (
            <Container centered>
                <Navbar />
                <div className="mt-10 w-full flex flex-col items-center justify-center">
                    <Tabs variant="bordered" radius="full" color="success">
                        <Tab title="Expense Tracker" className="w-full">
                            <div className="w-full mt-10 flex flex-col items-center justify-center">
                                <div className="lg:w-1/2 flex flex-col lg:flex-row items-center gap-y-5 lg:gap-y-0">
                                    <div className="w-full lg:w-1/2 flex justify-center lg:border-r lg:border-r-black">
                                        <div className="w-5/6 text-center">
                                            <p>Your Budget:</p>
                                            <h1 className="font-normal text-3xl">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(budget)}</h1>
                                        </div>
                                    </div>
                                    <Divider className="lg:hidden" />
                                    <div className="w-full lg:w-1/2 flex justify-center">
                                        <div className="w-5/6 text-center">
                                            <p>Your Spending:</p>
                                            <span className="font-normal text-3xl flex w-full justify-center gap-x-2"><h1>{refreshing ? "Loading..." : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}</h1><h1
                                                className={budget - total > 0 ? "text-green-500" : budget - total === 0 ? "text-gray-500" : "text-red-500"}
                                            >{
                                                    refreshing ? "" : `(${budget - total > 0 ? "+" : "-"}${((budget - total) / budget * 100).toFixed(0)}%)`
                                                }</h1></span>
                                        </div>
                                    </div>
                                </div>
                                <Card className="mt-10 w-5/6 h-[400px]">
                                    <CardBody>
                                        {
                                            hasToken ? <>
                                                <span className="flex flex-row justify-between">
                                                    <h1 className="font-normal text-2xl">Transactions</h1>
                                                    <Button isIconOnly onClick={refresh} isLoading={refreshing}>
                                                        {refreshing ? "" : <ArrowClockwise size={20} />}
                                                    </Button>
                                                </span>
                                                <Table removeWrapper className="mt-3 overflow-y-auto">
                                                    <TableHeader>
                                                        <TableColumn>Name</TableColumn>
                                                        <TableColumn>Date</TableColumn>
                                                        <TableColumn>Amount</TableColumn>
                                                    </TableHeader>
                                                    <TableBody emptyContent={
                                                        refreshing ? "Fetching transactions..." : "No transactions found."
                                                    }>
                                                        {refreshing ? "" :
                                                            transactions.map((transaction: any) => {
                                                                return (
                                                                    <TableRow key={transaction.name}>
                                                                        <TableCell>{transaction.name}</TableCell>
                                                                        <TableCell>{new Date(Date.parse(transaction.date)).toLocaleDateString()}</TableCell>
                                                                        <TableCell>{
                                                                            new Intl.NumberFormat("en-US", { style: "currency", currency: transaction.iso_currency_code }).format(transaction.amount)
                                                                        }</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </> : <>
                                                <div className="w-full h-full flex flex-col items-center justify-center">
                                                    <div className="w-1/2">
                                                        <h1 className="w-full text-center text-xl">Connect a bank account to get started</h1>
                                                        <Button size="lg" className="w-full bg-black text-white mt-5" onClick={() => {
                                                            open()
                                                        }} isLoading={!ready}>
                                                            {
                                                                ready ? "Connect Account" : ""
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </CardBody>
                                </Card>
                            </div>
                        </Tab>
                        <Tab title="Spending Insights" className="w-full flex flex-col items-center jsutify-center">
                            {
                                data ?
                                    <div className="w-5/6 flex justify-center mt-10">
                                        <div className="w-1/2 flex justify-center">
                                            <div className="w-2/3 h-full flex items-center">
                                                <Pie data={data} />
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <Card className="w-5/6 h-[450px]">
                                                <CardBody>
                                                    <h1 className="font-normal text-2xl">Your spending breakdown:</h1>
                                                    <Table removeWrapper className="mt-5 overflow-y-auto">
                                                        <TableHeader>
                                                            <TableColumn>#</TableColumn>
                                                            <TableColumn>Category</TableColumn>
                                                            <TableColumn>Percentage</TableColumn>
                                                        </TableHeader>
                                                        <TableBody emptyContent={
                                                            refreshing ? "Fetching transactions..." : "No transactions found."
                                                        }>
                                                            {
                                                                order!.map((key, index) => (
                                                                    <TableRow key={key}>
                                                                        <TableCell>{index + 1}</TableCell>
                                                                        <TableCell>{Normalize(key.toUpperCase())}</TableCell>
                                                                        <TableCell>{percent[key]}%</TableCell>
                                                                    </TableRow>
                                                                ))
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                    :
                                    <div className="w-full flex items-center justify-center mt-10">
                                        <h1 className="font-normal text-2xl">No transactions found.</h1>
                                    </div>
                            }
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        )
    }
}