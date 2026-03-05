import express, { Application } from "express"
import { login, logout, signup } from "../controller/auth.controller"
import verifyToken from "../middlewares/isAuth"

const router :Application = express()

router.post("/signup" , signup)
router.post("/login" , login)
router.get("/logout" , logout)
router.get("/isAuth" , verifyToken)

export default router;