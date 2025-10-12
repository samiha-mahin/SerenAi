import { Request , Response } from "express";
import { User } from "@/models/User";
import { Session } from "@/models/Session";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) =>{
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(409).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({
            user:{
                _id: user._id,
                name: user.name,
                email: user.email
            },
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}