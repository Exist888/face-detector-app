// Will be replaced with real database later 
import database from "../archive/data/data.mock.js";

export async function signInUser(email, password) {
    // Iterate through mock data users to find matching email
    const matchingUser = database.users.find((user) => {
        return user.email === email;
    });

    if (!matchingUser) return null;

    // Iterate through mock data login to find matching password
    const matchingLogin = database.login.find((cred) => {
        return matchingUser.email === cred.email;
    });

    // If matching user and login are found, ensure password matches as well
    if (matchingUser && matchingLogin && matchingLogin.hash === password) {
        return matchingUser;
    } else {
        return null;
    }
}

export async function signUpUser(name, email, password) {
    const existingUser = database.users.find((user) => {
        return user.email === email;
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const newUserId = (
        database.users.length 
        ? database.users[database.users.length - 1].id + 1 
        : 1
    );

    const newLoginId = (
        database.login.length
        ? database.login[database.login.length - 1].id + 1
        : 1
    );

    database.users.push({
        id: newUserId,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    database.login.push({
        id: newLoginId,
        email: email,
        hash: password
    });
    const newUser = database.users[database.users.length - 1];
    return newUser;
}