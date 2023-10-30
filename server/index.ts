import express, { Express, Request, Response } from "express"
import auth from "./firebase/auth"
import db from "./firebase/db"
import Collections from "./firebase/collections"
import cookieParser from "cookie-parser"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore"
import cors from "cors"
import { PlaidApi, Configuration, PlaidEnvironments, Products, CountryCode } from "plaid"
import "dotenv/config"
import moment from "moment"

const app: Express = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET!))

const config = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_ID!,
            "PLAID-SECRET": process.env.SANDBOX_SECRET!,
        }
    }
})

const plaid = new PlaidApi(config)

app.post("/get_access_token", async (req: Request, res: Response) => {
    const uid = req.body.uid
    const publicToken = req.body.public_token
    try {
        const docSnap = await getDoc(doc(db, Collections.Users, uid))
        if (docSnap.exists()) {
            if (docSnap.data().access_token) {
                res.json({
                    error: true,
                    errorMessage: "TOKEN_EXISTS"
                })
            } else {
                const { data } = await plaid.itemPublicTokenExchange({ public_token: publicToken })
                const accessToken = data.access_token
                try {
                    await updateDoc(doc(db, Collections.Users, uid), {
                        access_token: accessToken
                    })
                    res.json({
                        error: false,
                        errorMessage: "",
                        accessToken
                    })
                } catch (error) {
                    res.json({
                        error: true,
                        errorMessage: "INVALID_USER"
                    })
                }
            }
        }
    } catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        })
    }
})

app.post("/get_link_token", async (req: Request, res: Response) => {
    const uid = req.body.uid
    const docSnap = await getDoc(doc(db, Collections.Users, uid))
    if (docSnap.exists()) {
        const linkTokenResponse = await plaid.linkTokenCreate({
            user: {
                client_user_id: uid
            },
            client_name: "IntelliSpend Financial App",
            products: [Products.Transactions],
            country_codes: [CountryCode.Us],
            language: "en"
        })
        res.json({
            link_token: linkTokenResponse.data.link_token
        })
    } else {
        res.json({
            error: true,
            errorMessage: "INVALID_USER"
        })
    }
})

app.post("/create_user", async (req: Request, res: Response) => {
    try {
        const docSnap = await getDoc(doc(db, Collections.Emails, req.body.email))
        if (docSnap.exists()) {
            res.json({
                error: true,
                errorMessage: "USER_EXISTS"
            })
        } else {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
                await setDoc(doc(db, Collections.Users, user.uid), {
                    email: user.email
                })
                await setDoc(doc(db, Collections.Emails, user.email!), {
                    uid: user.uid
                })
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                })
            } catch (error) {
                console.log(error)
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            errorMessage: "Server is not responding. Please try again later."
        })
    }
})

app.post("/login", async (req: Request, res: Response) => {
    try {
        const docSnap = await getDoc(doc(db, Collections.Emails, req.body.email))
        if (!docSnap.exists()) {
            res.json({
                error: true,
                errorMessage: "INVALID_USER"
            })
        } else {
            try {
                const { user } = await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                })
            } catch (error) {
                console.log(error)
                res.json({
                    error: true,
                    errorMessage: "INVALID_AUTH"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        })
    }
})

app.post("/getData", async (req: Request, res: Response) => {
    try {
        const docSnap = await getDoc(doc(db, Collections.Users, req.body.uid))
        if (docSnap.exists()) {
            let hasToken = false
            if (docSnap.data().access_token) {
                hasToken = true
            }
            res.json({
                error: false,
                errorMessage: "",
                budget: docSnap.data().budget,
                hasToken
            })
        } else {
            res.json({
                error: true,
                errorMessage: "User does not exist"
            })
        }
    } catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        })
    }
})

app.post("/getTransactions", async (req: Request, res: Response) => {
    const uid = req.body.uid
    try {
        const docSnap = await getDoc(doc(db, Collections.Users, uid))
        const accessToken = docSnap.data()?.access_token
        const startDate = moment().startOf("month").format("YYYY-MM-DD")
        const endDate = moment().endOf("month").format("YYYY-MM-DD")
        try {
            const { data } = await plaid.transactionsGet({
                access_token: accessToken,
                start_date: startDate,
                end_date: endDate
            })
            res.json({
                error: false,
                transactions: data.transactions
            })
        } catch (error) {
            res.json({
                error: true,
                errorMessage: "INVALID_TOKEN"
            })
        }
    } catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        })
    }
})

app.post("/setBudget", async (req: Request, res: Response) => {
    const uid = req.body.uid
    try {
        await updateDoc(doc(db, Collections.Users, uid), {
            budget: req.body.budget
        })
        res.json({
            error: false,
            errorMessage: ""
        })
    } catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        })
    }
})

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080")
})

