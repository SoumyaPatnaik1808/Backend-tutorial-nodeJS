const fs = require("fs"); 
const express = require("express"); 
const users = require("./MOCK_DATA.json"); 
const app = express(); 
const PORT = 8000; 

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send("This is home page");
});

app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

// Base Route (/api/users) -- Frontend will use this route to get all users and also to create a new user
app.route("/api/users")
    .get((req, res) => {
        res.status(200).json(users); //here status code is 200 which means successfully fetched the data
if(!users.length) {
            return res.status(404).json({ status: "Failed", message: "No users found" }); //here status code is 404 which means not found
        }// previously we were getting a 200 status code even when there were no users in the database, which is not correct. Now we are checking if the users array is empty and returning a 404 status code with a message indicating that no users were found.

    })
    .post((req, res) => {
        const body = req.body;
        users.push({ ...body, id: users.length + 1 }); 
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            return res.status(201).json({ status: "Success", id: users.length }); //here status code is 201 which means successfully created the data
        });

        if(!body.first_name || !body.last_name || !body.email) {
            return res.status(400).json({ status: "Failed", message: "Please provide all required fields" }); //here status code is 400 which means bad request
        }
    });

// ID-specific Routes (/api/users/:id)
app.route("/api/users/:id") // :id -> dynamic parameter
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    })
    .patch((req, res) => {})
    .delete((req, res) => {
        // Delete handler implementation goes here
    });

// Start Server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});