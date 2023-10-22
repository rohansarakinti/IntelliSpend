import express, { Express, Request, Response } from "express"
import auth from "./firebase/auth"
import db from "./firebase/db"
import cors from "cors"

const app: Express = express()
app.use(express.json())
app.use(cors())

