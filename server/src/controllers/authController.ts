import { Request , Response } from "express";
import { User } from "../models/User";
import { Session } from "../models/Session";
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
            return res.status(409).json({message: "User already exists"}) //409-conflict
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
        
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"}); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
       }

       const token = jwt.sign(
        { userId: user._id},
        process.env.JWT_SECRET || "",
        { expiresIn: "24h" }
       );

       const expiresAt = new Date();
       expiresAt.setHours(expiresAt.getHours() + 24 );

       const session = new Session({
        userId: user._id,
        token,
        expiresAt,
        deviceInfo: req.headers['user-agent'] || "Unknown"
       });
       await session.save();

       res.json({
        user: {
            _id : user._id,
            name: user.name,
            email: user.email
        },
        token,
        message: "Login successful"
       });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            await Session.deleteOne({ token });
        }else {
            console.log("No token provided");
        }
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}