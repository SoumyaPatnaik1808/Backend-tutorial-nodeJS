# Simple HTTP Server in Node.js

This project demonstrates how to create a **basic HTTP server** using Node.js. It also logs every incoming request into a `log.txt` file.

---

# Modules Used

```javascript
const http = require('http');
const fs = require('fs');
```

### `http` Module
The **http** module is a built-in Node.js module that allows us to create a web server and handle HTTP requests and responses.

### `fs` Module
The **fs (File System)** module is another built-in Node.js module that lets us work with files. In this project, we use it to save request logs into a file.

---

# Creating the Server

```javascript
const Server = http.createServer((req, res) => {
```

The `createServer()` method creates an HTTP server.

It takes a **request handler function** as its argument. This function runs **every time a client (browser, Postman, etc.) sends a request** to the server.

The function receives two objects:

- **`req` (Request Object)** → Contains information sent by the client.
- **`res` (Response Object)** → Used to send a response back to the client.

Think of it like this:

```text
Browser
   │
   │ Request
   ▼
Node.js Server
   │
   │ Processes Request
   ▼
Response sent back to Browser
```

---

# Creating a Log Message

```javascript
const log = `${Date.now()} : Request received for ${req.url}\n`;
```

Here we create a string that stores:

- Current timestamp using `Date.now()`
- The URL requested by the client (`req.url`)

For example, if someone visits:

```
http://localhost:8000/about
```

The log becomes:

```text
1754144000000 : Request received for /about
```

The `\n` adds a **new line**, so each request is written on a separate line in the log file.

---

# Saving the Log to a File

```javascript
fs.appendFile('log.txt', log, (err, data) => {
```

The `appendFile()` method writes data to a file.

If the file doesn't exist, Node.js automatically creates it.

If it already exists, the new log is added **at the end** of the file instead of replacing the existing content.

### Parameters

```javascript
fs.appendFile(filename, data, callback)
```

| Parameter | Description |
|-----------|-------------|
| `filename` | Name of the file (`log.txt`) |
| `data` | The content to write |
| `callback` | Runs after writing is complete |

Example:

```
log.txt

1754144000000 : Request received for /
1754144002000 : Request received for /about
1754144005000 : Request received for /contact
```

---

# Handling Different Routes

Inside the callback, you check which URL the client requested.

```javascript
switch(req.url){
```

The `switch` statement compares the requested URL with different cases.

---

## Home Route

```javascript
case '/':
    res.end("Home page");
    break;
```

If the user visits:

```
http://localhost:8000/
```

The browser displays:

```
Home page
```

---

## About Route

```javascript
case '/about':
    res.end("About page");
    break;
```

If the user visits:

```
http://localhost:8000/about
```

The browser displays:

```
About page
```

---

## Contact Route

```javascript
case '/contact':
    res.end("Contact page");
    break;
```

If the user visits:

```
http://localhost:8000/contact
```

The browser displays:

```
Contact page
```

---

## Default Route (404)

```javascript
default:
    res.end("404 page not found");
```

If the requested URL doesn't match any of the above routes, the server responds with:

```
404 page not found
```

For example:

```
http://localhost:8000/login
```

Output:

```
404 page not found
```

---

# Printing Request Headers

```javascript
console.log(req.headers);
```

Every HTTP request contains **headers**, which provide additional information about the request.

Some common headers are:

- Browser information
- Host name
- Accepted content type
- Language
- Cookies

Example:

```javascript
{
  host: 'localhost:8000',
  connection: 'keep-alive',
  user-agent: 'Mozilla/5.0',
  accept: 'text/html'
}
```

This is useful for debugging and understanding how clients communicate with your server.

---

# Logging a Message

```javascript
console.log("Request received from the client!");
```

Whenever a request reaches the server, this message is printed in the terminal.

Example:

```
Request received from the client!
```

---

# Starting the Server

```javascript
Server.listen(8000, () => {
    console.log("Server initialized on port 8000");
});
```

The `listen()` method starts the server.

### Parameters

```javascript
Server.listen(port, callback)
```

| Parameter | Description |
|-----------|-------------|
| `8000` | Port number where the server listens |
| `callback` | Runs once the server starts successfully |

After running:

```bash
node index.js
```

The terminal displays:

```
Server initialized on port 8000
```

Now your server is available at:

```
http://localhost:8000
```

---

# How the Entire Flow Works

Imagine someone opens:

```
http://localhost:8000/about
```

The execution happens like this:

### Step 1

The browser sends an HTTP request.

↓

### Step 2

Node.js receives the request.

↓

### Step 3

`createServer()` executes the request handler function.

↓

### Step 4

A log message is created.

↓

### Step 5

The log is appended to `log.txt`.

↓

### Step 6

The `switch` statement checks the requested URL (`/about`).

↓

### Step 7

The server sends the response:

```
About page
```

↓

### Step 8

The browser displays:

```
About page
```

---

# Folder Structure

```text
project/
│
├── index.js
├── log.txt
├── package.json
└── README.md
```

---

# Sample Output

### Browser

```
Home page
```

or

```
About page
```

or

```
Contact page
```

---

### Terminal

```
Server initialized on port 8000

Request received from the client!

{
  host: 'localhost:8000',
  connection: 'keep-alive',
  user-agent: 'Mozilla/5.0'
}
```

---

### log.txt

```text
1754144000000 : Request received for /
1754144010000 : Request received for /about
1754144025000 : Request received for /contact
```

---

# Key Concepts Learned

- Importing built-in Node.js modules (`http` and `fs`)
- Creating an HTTP server using `http.createServer()`
- Understanding the **Request (`req`)** and **Response (`res`)** objects
- Using `req.url` to identify the requested route
- Handling different routes with a `switch` statement
- Writing logs to a file using `fs.appendFile()`
- Printing request headers using `req.headers`
- Starting the server with `Server.listen()`

---

# One-Line Summary

> This project creates a simple Node.js HTTP server that listens for client requests, records each request in a `log.txt` file, and returns different responses based on the requested URL.