const express = require('express'); 
const app = express(); 
const PORT = 8001; 
const urlRoute = require('./Routes/url.js');
const {connectToMongoDB} = require('./connect');

connectToMongoDB('mongodb://localhost:27017/shortURL').then(()=>{console.log("MongoDB connected")});
app.use(express.json());
app.use('/url', urlRoute)


//Running the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));