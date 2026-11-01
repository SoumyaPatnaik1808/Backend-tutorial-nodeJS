const fs = require("fs"); 
const express = require("express"); 
const users = require("./MOCK_DATA.json"); 
const app = express(); 
const PORT = 8000; 

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes


// Start Server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});