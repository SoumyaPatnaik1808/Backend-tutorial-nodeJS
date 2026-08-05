const http = require('http'); 
const url = require('url'); // Importing the 'url' module to work with URLs
const fs = require('fs'); // Importing the 'fs' module to work with the file system

const Server = http.createServer((req, res) => { //Request handler function that is called whenever a request is received by the server
    const log = `${Date.now()} : ${req.url} : ${req.method} : Request received for ${req.url} \n `
    
    fs.appendFile('log.txt', log, (err,data)=> {
        switch(req.url){
            case '/': 
            res.end("Home page"); 
            break; 
            case '/about': 
            res.end("About page"); 
            break; 
            case '/contact': 
            res.end("Contact page");
            break;  
            case '/signup': 
            if(req.method === 'POST'){ // Checks if the request method is POST , in this case it is used to handle the form 'submission' for the signup page
                res.end("Successfully signed up"); 
            } 
            else if(req.method === 'GET'){ // Checks if the request method is GET , in this case it is used to handle the 'request' for the signup page
                res.end("Signup page"); 
            } 
            else{ 
                res.end("Method not allowed"); // Sends a response back to the client indicating that the method is not allowed
            }
            break;
            default: 
            res.end("404 page not found");// Sends a response back to the client with the message according to the requested URL
        }
    }) // Appends the log to a file named 'log.txt' and sends a response back to the client
    console.log(req.headers); // Logs the request headers to the console
    console.log("Request received from the client!"); // Logs a message indicating that a request has been received
   
    


})

Server.listen(8000, ()=>{console.log("Server initialized on port 8000")}) // Starts the server and listens on port 8000, logging a message to the console when the server is initialized

// Now we will do a assignment, we will now save the logs to a html file instead of console. We will use the fs module to do that. 

