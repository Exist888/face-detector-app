import database from "../archive/data/data.mock.js";

export async function updateUserEntries(userObj) {
    console.log("user backend: ", userObj);
    // Match user parameter with item in database array
    const updatedUser = database.users.find((user) => {
        return user.email === userObj.email;
    });

    if (updatedUser) {
        updatedUser.entries ++;
    }

    // Return the updated user object
    return updatedUser;
}