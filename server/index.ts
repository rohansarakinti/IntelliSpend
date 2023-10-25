import express, { Express, Request, Response } from "express"
import auth from "./firebase/auth"
import db from "./firebase/db"
import Collections from "./firebase/collections"
import cookieParser from "cookie-parser"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { getDoc, setDoc, doc } from "firebase/firestore"
import cors from "cors"
import { PlaidApi, Configuration, PlaidEnvironments, Products, CountryCode } from "plaid"
import "dotenv/config"

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

app.post("/call_transactions", (req: Request, res: Response) => {
    res.status(200).send("Webhook received")
    console.log(req.body.webhook_code)
})

app.post("/get_access_token", (req: Request, res: Response) => {
    plaid.itemPublicTokenExchange({ public_token: req.body.public_token! }).then((tokenResponse) => {
        res.json(tokenResponse.data)
    }).catch((error) => {
        res.json(error.message)
    })
})

app.post("/get_link_token", (req: Request, res: Response) => {
    const uid =
        plaid.linkTokenCreate({
            user: {
                client_user_id: "123-test-user-id"
            },
            client_name: "Plaid Test App",
            products: [Products.Transactions, Products.Balance, Products.Auth],
            country_codes: [CountryCode.Us],
            language: "en"
        }).then((tokenResponse) => {
            res.json(tokenResponse.data)
        }).catch((error) => {
            res.json(error.message)
        })
})

app.post("/create_user", async (req: Request, res: Response) => {
    try {
        const docSnap = await getDoc(doc(db, Collections.Emails, req.body.email))
        if (docSnap.exists()) {
            res.json({
                error: true,
                errorMessage: "User already exists"
            })
        } else {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email
                })
                if (req.body.rememberMe) {
                    res.cookie("uid", user.uid, { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true, secure: true })
                } else {
                    res.cookie("uid", user.uid, { signed: true, httpOnly: true, secure: true })
                }
            } catch (error) {
                console.log(error)
                res.json({
                    error: true,
                    errorMessage: "Server is not responding. Please try again later."
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
                errorMessage: "User does not exist"
            })
        } else {
            try {
                const { user } = await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
                if (req.body.rememberMe) {
                    res.cookie("uid", user.uid, { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true, secure: true })
                } else {
                    res.cookie("uid", user.uid, { signed: true, httpOnly: true, secure: true })
                }
                res.json({
                    error: false,
                    errorMessage: ""
                })
            } catch (error) {
                console.log(error)
                res.json({
                    error: true,
                    errorMessage: "Incorrect email/password"
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

app.get("/checkLogin", (req: Request, res: Response) => {
    if (req.signedCookies.uid) {
        res.json({
            loggedIn: true
        })
    } else {
        res.json({
            loggedIn: false
        })
    }
})

app.post("/signout", (req, res) => {
    res.clearCookie("uid")
    res.json({
        signedOut: true
    })
})

app.post("/getData", async (req: Request, res: Response) => {
    const docSnap = await getDoc(doc(db, Collections.Users, req.signedCookies.uid))
    if (docSnap.exists()) {
        if (docSnap.data().access_token) {
            res.json({
                error: false
            })
        } else {
            res.json({
                error: true,
                errorMessage: "User does not have access token"
            })
        }
    } else {
        res.json({
            error: true,
            errorMessage: "User does not exist"
        })
    }
})

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080")
})

