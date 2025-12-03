import express, { Application, Request, Response } from "express";
import { userRoutes } from "./modules/auth/user.routes";

import cors from "cors";

const app: Application = express();
app.use(express.json({ limit: '500kb' }));
app.use(cors());

//endpoints
app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});

app.use("/api/users", userRoutes);

export default app;