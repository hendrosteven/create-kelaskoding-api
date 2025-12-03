import type { Request, Response } from "express";
import { createUser, getAllUsers, getUserByEmail } from "./user.service";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { User } from "../../db/schemas/users";


export const createUserController = async (req: Request<User>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }

    try {
        const user = await createUser(req.body);
        res.status(201).json({ success: true, user });
    } catch (err) {
        console.error("Error in createUserController:", err);
        res.status(500).json({ success: false, message: "User creation failed: " + (err instanceof Error ? err.message : 'Unknown error') });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        if (!user.status) {
            return res.status(403).json({ error: "Your account is not active" });
        }

        const jwtToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token: jwtToken });
    } catch (err) {
        console.error("Error in loginUserController:", err);
        res.status(500).json({ error: "Login failed" });
    }
}

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error in getAllUsersController:", err);
        res.status(500).json({ error: "Get all users failed" });
    }
}