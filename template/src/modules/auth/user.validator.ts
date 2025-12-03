import { body } from "express-validator";

export const userValidator = {
    createUser: [
        body("email")
            .isEmail().withMessage("Invalid email format"),
        body("name")
            .isString().isLength({ min: 3 }).withMessage("Name is required"),
        body("password")
            .isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ]
}