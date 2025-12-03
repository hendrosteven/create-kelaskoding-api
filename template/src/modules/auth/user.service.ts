import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../db/db"
import { usersTable, type User } from "../../db/schemas/users"

export const createUser = async (userData: User): Promise<User> => {
    try {
        const currentUser = await getUserByEmail(userData.email);
        if (currentUser) {
            throw new Error("Email already exists.");
        }

        let hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        // Use transaction to ensure both user and balance creation succeed or fail together
        const result = await db.transaction(async (tx) => {
            const [newUser] = await tx.insert(usersTable).values(userData).returning();
            if (!newUser) {
                throw new Error("User creation failed: no result returned from database.");
            }
            return newUser;
        });

        return result;
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
        return user || null;
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err;
    }
}

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await db.select().from(usersTable);
        return users;
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
    }
}