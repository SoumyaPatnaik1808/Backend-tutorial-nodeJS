//Here we have built a REST API using express.js and we have used the MOCK_DATA.json file as our database. We have created 4 routes in this API.

const express = require("express"); 
const users = require("./MOCK_DATA.json"); 
const app = express(); 
const PORT = 8000; 


//REST API - Representational State Transfer API
app.get('/users' , (req,res)=> {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html);  // This the route in html format , like the data can be seen graphically 
})

app.get("/api/users", (req,res)=> {
    res.json(users); // This is the route in json format , like the data can be seen in json format
})

app.get('/', (req,res)=> {
    res.send("This is home page") // home page route
})

//Dynamic path parameters 
// Now if we have to get the data of a particular user then we can use dynamic route parameters 


app.get("/api/users/:id", (req,res)=> {
    const id = req.params.id; // This is the dynamic route parameter 
    const user = users.find(user=> user.id == id); // This is the logic to find the user with the given id
    if(user){
        res.json(user); // If user is found then return the user data in json format
    }else{
        res.status(404).json({message: "User not found"}); // If user is not found then return 404 error
    }
})

//POST request - we will create a new user and add it to the users array - we will see it in next lecture
//PATCH request - we will update a user with the given id - we will see it in next lecture 
//DELETE request - we will delete a user with the given id - we will see it in next lecture

//Merging all REST API routes in one route  

app.route("/api/users").get((req,res)=>{
    res.json(users); 
}).patch((req,res)=>{})
  .post((req,res)=> {})
  .delete((req,res)=>{})

app.listen(PORT , ()=> {
    console.log("Server is running in port " + PORT);
})

