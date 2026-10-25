const fs = require("fs"); 
const express = require("express"); 
const users = require("./MOCK_DATA.json"); 
const app = express(); 
const PORT = 8000; 
const mongoose = require('mongoose'); 

//connection of mongoose with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/StudentDBbackendL')
.then(()=>{console.log("MongoDB coneected successfully")})
.catch((err)=>{console.log("MongoDB connection failed", err)}) 


//Mongoose Schema

const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required : true
    },

    last_name:{
        type:String, 
        required : false,
    },

    email:{
        type : String, 
        required: true, 
        unique : true 
    }, 
    job_title:{
        type : String, 
        required : true, 

    },
    gender:{
         type: String, 
         
    }, 
 
    timestamps: true // gives the createdAt and updatedAt fields automatically
})


//Mongoose model 

const User = mongoose.model('User', userSchema); 


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
    .post(async(req, res) => {
        const body = req.body;
        if(!body.first_name || 
           !body.last_name || 
           !body.email ||
           !body.job_title || 
           !body.gender) {
            return res.status(400).json({ status: "Failed", message: "Please provide all required fields" }); //here status code is 400 which means bad request
        }
        

       const result = await User.create({
            first_name: body.first_name, 
            last_name:body.last_name, 
            email:body.email, 
            job_title:body.job_title,
            gender:body.gender
        })


        console.log(result);
        return res.status(201).json({msg:"Success"})
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