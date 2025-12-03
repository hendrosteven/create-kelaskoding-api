import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../modules/auth/user.service";


export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    //remove Bearer from token string
    token = token.replace("Bearer", "").trim();

    jwt.verify(
        token.toString(),
        process.env.JWT_SECRET as string,
        async (err: any, decoded: any) => {
            if (err) return res.status(401).send({ success: false, code: 401, message: "Unauthorized!" });

            const user = await getUserByEmail(decoded.email);
            if (!user) return res.status(401).send({ success: false, code: 401, message: "Unauthorized!" });
            if (!user.status)
                return res.status(403).send({ success: false, code: 403, message: "Your account is not active" });

            req.userId = user.id;
            req.userEmail = user.email;
            next();
        }
    );
}

