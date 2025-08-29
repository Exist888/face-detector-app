const database = {
    users: [
        {
            id: 123,
            name: "Frodo Baggins",
            email: "frodo.baggins@example.com",
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: "Peregrin Took",
            email: "peregrin.took@example.com",
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: 1,
            email: "frodo.baggins@example.com",
            hash: "fakehashpassword1"
        },
        {
            id: 2,
            email: "peregrin.took@example.com",
            hash: "fakehashpassword2"
        }
    ]
}

export default database;