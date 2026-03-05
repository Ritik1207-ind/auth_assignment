import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

const verifyToken = async (req : Request , res : Response , next : NextFunction) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(400).json({
            success :false , 
            message : "Unauthorized : No token Provided"
        })
    }
    try {
        if (!process.env.JWT_SECRET){
            return res.status(500).json({success : false , message : "No JWT Provided"})
        }
        const decoded : JwtPayload | string = jwt.verify(token , process.env.JWT_SECRET);
        if (!decoded){

        }
    } catch (error) {
        
    }
}

export default verifyToken;