import express, { Request, Response } from 'express';
import connectDB from './db/db';
import "dotenv/config"
import router from './routes/auth.route';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use("/api/auth" , router)

connectDB()
const port  = process.env.PORT || 3000
app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})