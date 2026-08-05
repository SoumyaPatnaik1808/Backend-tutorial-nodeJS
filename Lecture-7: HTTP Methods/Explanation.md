# 🌐 Understanding HTTP Methods in Node.js (Beginner Friendly)

## 🎯 Objective

This program demonstrates how a Node.js server:

- Creates an HTTP server
- Handles different URLs (routes)
- Handles different HTTP methods (GET, POST, etc.)
- Stores request logs in a file
- Sends different responses based on the request

---

# 📌 What is HTTP?

**HTTP (HyperText Transfer Protocol)** is the language used by the browser and the server to communicate.

Whenever you open a website, submit a form, or request data, your browser sends an **HTTP Request** to the server.

The server processes the request and sends back an **HTTP Response**.

```
Browser
   │
HTTP Request
   │
   ▼
Node.js Server
   │
HTTP Response
   │
   ▼
Browser
```

---

# 📌 What are HTTP Methods?

An **HTTP Method** tells the server **what action the client wants to perform**.

Think of it like giving instructions.

Example:

> "Show me the homepage."

or

> "Save my signup details."

The method tells the server what to do.

---

# 📖 Common HTTP Methods

## 1. GET

### Purpose

Used to **request or fetch data** from the server.

It does **NOT** change anything.

### Example

Opening a website

```
GET /
```

Server Response

```
Home Page
```

Another example

```
GET /signup
```

Response

```
Signup Page
```

### Real-life Analogy

You ask a librarian:

> "Can I read this book?"

You only read it.

You don't change it.

---

## 2. POST

### Purpose

Used to **send new data** to the server.

Usually used in

- Registration
- Login
- Contact Forms
- Uploading data

Example

```
POST /signup
```

Server saves the user information.

Response

```
Successfully Signed Up
```

### Real-life Analogy

You fill out a college admission form and submit it.

The office stores your information.

---

## 3. PUT

### Purpose

Used to **replace existing data completely**.

Example

Old User

```
Name : Soumya
Age : 20
```

PUT request

```
PUT /user
```

New Data

```
Name : Rahul
Age : 22
```

Everything gets replaced.

### Real-life Analogy

Replacing your entire resume with a new one.

---

## 4. PATCH

### Purpose

Used to **update only a part of existing data**.

Example

Old Data

```
Name : Soumya
Age : 20
```

PATCH Request

```
PATCH /user
```

Only change

```
Age = 21
```

Final Data

```
Name : Soumya
Age : 21
```

### Real-life Analogy

Changing only your phone number on your college profile.

---

## 5. DELETE

### Purpose

Deletes data.

Example

```
DELETE /user/12
```

Deletes user number 12.

### Real-life Analogy

Deleting a photo from your gallery.

---

## 6. OPTIONS

### Purpose

Asks the server

> "Which HTTP methods do you support?"

Example

```
OPTIONS /signup
```

Server may reply

```
GET
POST
PUT
DELETE
```

Mostly used by browsers internally.

---

## 7. HEAD

### Purpose

Same as GET,

but returns **only the headers**, not the actual content.

Useful when checking

- File size
- Last modified date
- Server information

without downloading the whole file.

---

## 8. TRACE

Used mainly for debugging.

It returns the request exactly as received.

Rarely used in real applications.

---

## 9. CONNECT

Used to establish secure connections (HTTPS tunnels).

Mostly used by proxies.

Not commonly used while learning Node.js.

---

# ⭐ The HTTP Methods You'll Use Most

| Method | Purpose |
|---------|----------|
| GET | Read data |
| POST | Create new data |
| PUT | Replace data completely |
| PATCH | Update part of data |
| DELETE | Remove data |

These five methods are the ones you'll use in almost every web application.

---

# 📌 Understanding the Program

---

## Importing Modules

```javascript
const http = require('http');
const url = require('url');
const fs = require('fs');
```

### http

Creates an HTTP server.

### url

Used to work with URLs.

Example

```
/about?id=10
```

It can separate

- pathname
- query parameters
- host
- protocol

> Note: In this program, the `url` module is imported but **not actually used**. It's included for future URL parsing examples.

### fs

Allows Node.js to work with files.

Used here for storing request logs.

---

# Creating the Server

```javascript
const Server = http.createServer((req, res) => {
```

Whenever a request comes,

this callback function runs automatically.

It receives two objects.

### req (Request)

Contains everything sent by the browser.

Examples

```
URL

Method

Headers

Body
```

---

### res (Response)

Used to send data back to the browser.

Example

```javascript
res.end("Home Page");
```

---

# Creating the Log

```javascript
const log = `${Date.now()} : ${req.url} : ${req.method}`;
```

Creates a log like

```
1754412345123 : /signup : POST
```

It stores

- Current timestamp
- Requested URL
- HTTP Method

---

# Saving Logs

```javascript
fs.appendFile("log.txt", log, ...)
```

`appendFile()` adds new content to the end of the file.

If the file doesn't exist,

Node.js creates it automatically.

Example

```
Request 1

Request 2

Request 3
```

Nothing gets overwritten.

---

# Route Handling

```javascript
switch(req.url)
```

Checks which URL the user requested.

---

## Home Page

```javascript
case "/":
```

Browser visits

```
localhost:8000/
```

Response

```
Home Page
```

---

## About Page

```javascript
case "/about":
```

Response

```
About Page
```

---

## Contact Page

```javascript
case "/contact":
```

Response

```
Contact Page
```

---

# Signup Route

```javascript
case "/signup":
```

This page behaves differently depending on the HTTP method.

---

## GET Request

```javascript
if(req.method === "GET")
```

When someone visits

```
localhost:8000/signup
```

The server returns

```
Signup Page
```

No data is stored.

---

## POST Request

```javascript
if(req.method === "POST")
```

When the user submits the signup form,

the server responds

```
Successfully Signed Up
```

In real applications,

this is where the server would save the user's information to a database.

---

## Other Methods

```javascript
Method Not Allowed
```

If someone sends

```
DELETE /signup
```

or

```
PUT /signup
```

the server responds

```
Method Not Allowed
```

---

# Default Route

```javascript
default:
```

If the requested page doesn't exist,

the server returns

```
404 Page Not Found
```

---

# Logging Request Headers

```javascript
console.log(req.headers);
```

Displays information sent by the browser.

Example

```javascript
{
  host: 'localhost:8000',
  connection: 'keep-alive',
  user-agent: 'Mozilla/5.0',
  accept: 'text/html'
}
```

Headers provide extra information about the request, such as:

- Browser type
- Accepted content type
- Host
- Cookies
- Authentication tokens (if any)

---

# Starting the Server

```javascript
Server.listen(8000, () => {
    console.log("Server initialized");
});
```

Starts the server.

It listens for incoming requests on port **8000**.

You can now visit:

```
http://localhost:8000
```

---

# Complete Flow of the Program

```
Browser
     │
     │ GET /about
     ▼
Node.js Server
     │
Receives Request
     │
Creates Log
     │
Saves Log in log.txt
     │
Checks URL using switch()
     │
Checks HTTP Method (if needed)
     │
Sends Appropriate Response
     ▼
Browser Displays Result
```

---

# Example Requests

### GET Home

```
GET /
```

Response

```
Home Page
```

---

### GET Signup

```
GET /signup
```

Response

```
Signup Page
```

---

### POST Signup

```
POST /signup
```

Response

```
Successfully Signed Up
```

---

### Unknown Route

```
GET /abc
```

Response

```
404 Page Not Found
```

---

# Key Takeaways

- **HTTP** is the communication protocol between a client (browser) and a server.
- **HTTP methods** tell the server what action the client wants to perform.
- **GET** retrieves data, while **POST** sends new data to the server.
- **PUT** replaces data, **PATCH** updates part of it, and **DELETE** removes it.
- The `http` module creates the server.
- The `fs` module writes request logs to a file.
- `req.url` identifies which route was requested.
- `req.method` identifies the HTTP method (GET, POST, etc.).
- `switch(req.url)` is used to handle different routes.
- `res.end()` sends the response and ends the request.
- `Server.listen(8000)` starts the server and listens for incoming requests on port 8000.