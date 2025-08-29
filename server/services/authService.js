import bcrypt from "bcrypt";
import db from "../config/db.js";

const SALT_ROUNDS = 12;

export async function signInUser(email, password) {
    // Returns first record from users table where email matches user input
    const matchingUser = await db("users").where({ email }).first();

    if (!matchingUser) return null;

    // Returns first record from login table where email matches user input
    const matchingLogin = await db("login").where({ email }).first();

    // Compare password using bcrypt
    const isValid = await bcrypt.compare(password, matchingLogin.hash);
    
    if (matchingUser && matchingLogin && isValid) {
        return matchingUser;
    } else {
        return null;
    }
}

export async function signUpUser(name, email, password) {
    // Check for existing user with matching email
    const existingUser = await db("users").where({ email }).first();

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const [newUser] = await db.transaction(async trx => {
            const [insertedUser] = await trx("users").insert({
                name: name,
                email: email,
                entries: 0,
                joined: new Date()
            })
            .returning("*");
            
            await trx("login").insert({
                email: email,
                hash: hashedPassword
            });

            return [insertedUser];            
        });

        return newUser; 

    } catch (err) {
        console.error("Transaction failed: ", err.message, err.stack);
        throw new Error("Failed to register user");
    }
}