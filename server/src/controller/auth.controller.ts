import { Request, Response } from "express";
import User, { Tuser } from "../model/user.model";
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utils/setCookies";

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exist" })
        }

        const hashedPassword: string = await bcrypt.hash(password, 10)
        const NewUser = await User.create({
            fullname,
            password: hashedPassword,
            email
        })
        generateTokenAndSetCookie(res, NewUser._id)
        return res.status(201).json({ success: true, message: "Account Created" })
    } catch (error) {
        console.log("Error in signup function : ", error)
        return res.status(500).json({ success: false })

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All Fields Are Required" })
        }
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({success : false , message : "User Not Exist"})
        }
        let isCorrect: boolean = await bcrypt.compare(password , user.password)
        if (!isCorrect){
            return res.status(400).json({
                success : false , 
                message : "Password is Incorrect"
            })
        }
        generateTokenAndSetCookie(res , user._id);
        return res.status(200).json({success : true , message : "Logged In Successfully"})
    } catch (error) {
        console.log("Error in Login Function :" , error)
        return res.status(500).json({success : false})
    }
}

export const logout = (req : Request , res : Response) => {
    try {
       res.clearCookie("token")
       return res.status(200).json({success : true , message : "Logout Successfully"})
    } catch (error) {
        console.log("Error in Logout Function : " ,error)
        return res.status(500).json({success : false})
    }
}