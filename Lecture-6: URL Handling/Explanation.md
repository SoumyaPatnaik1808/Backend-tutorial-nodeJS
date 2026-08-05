# URL Handling in Node.js

## Objective
Learn how Node.js handles URLs using the built-in `url` module by creating a simple HTTP server that:
- Parses the requested URL.
- Extracts the URL path.
- Extracts query parameters.
- Responds based on the query parameter.

---

# Program

```javascript
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    // Parse the requested URL
    const parsedUrl = url.parse(req.url, true);

    console.log("Path:", parsedUrl.pathname);
    console.log("Query Parameters:", parsedUrl.query);

    res.writeHead(200, { "Content-Type": "text/plain" });

    res.write(`Path: ${parsedUrl.pathname}\n`);

    if (parsedUrl.query.name) {
        res.write(`Hello, ${parsedUrl.query.name}!`);
    } else {
        res.write("Hello, Guest!");
    }

    res.end();
});

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
```

---

# Step-by-Step Explanation

## Step 1: Import Required Modules

```javascript
const http = require("http");
const url = require("url");
```

### Explanation

- `http` module is used to create an HTTP server.
- `url` module is used to parse and manipulate URLs.

---

## Step 2: Create the Server

```javascript
const server = http.createServer((req, res) => {
```

### Explanation

Whenever a client sends a request:

- `req` contains the request details.
- `res` is used to send a response back to the client.

Example:

```
Browser
   │
   ▼
http://localhost:3000/?name=John
   │
   ▼
Request arrives at server
```

---

## Step 3: Parse the URL

```javascript
const parsedUrl = url.parse(req.url, true);
```

### Explanation

Suppose the browser requests:

```
http://localhost:3000/about?name=John&age=20
```

The server only receives:

```
/about?name=John&age=20
```

`url.parse()` breaks it into different parts.

Result:

```
parsedUrl
│
├── pathname → "/about"
│
└── query
      │
      ├── name : "John"
      └── age  : "20"
```

The second parameter `true` converts the query string into a JavaScript object.

Without `true`

```
"name=John&age=20"
```

With `true`

```javascript
{
    name: "John",
    age: "20"
}
```

---

## Step 4: Display URL Information

```javascript
console.log("Path:", parsedUrl.pathname);
console.log("Query Parameters:", parsedUrl.query);
```

### Output

If URL is

```
http://localhost:3000/about?name=John
```

Console:

```
Path: /about

Query Parameters:
{
    name: 'John'
}
```

---

## Step 5: Send HTTP Response Header

```javascript
res.writeHead(200, {
    "Content-Type": "text/plain"
});
```

### Explanation

This tells the browser:

- Status Code = **200 (Success)**
- Content Type = Plain Text

---

## Step 6: Send the Requested Path

```javascript
res.write(`Path: ${parsedUrl.pathname}\n`);
```

If the browser requests

```
http://localhost:3000/about
```

Response:

```
Path: /about
```

---

## Step 7: Read Query Parameters

```javascript
if (parsedUrl.query.name) {
    res.write(`Hello, ${parsedUrl.query.name}!`);
} else {
    res.write("Hello, Guest!");
}
```

### Explanation

If the URL contains

```
?name=John
```

Then

```javascript
parsedUrl.query.name
```

returns

```
John
```

Otherwise it returns

```
undefined
```

Hence,

```
URL:
http://localhost:3000/?name=John

Output:
Hello, John!
```

and

```
URL:
http://localhost:3000/

Output:
Hello, Guest!
```

---

## Step 8: End the Response

```javascript
res.end();
```

This tells Node.js:

> "The response has been completed."

Without `res.end()`, the browser will keep waiting for more data.

---

## Step 9: Start the Server

```javascript
server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
```

This starts the server on **Port 3000**.

Open:

```
http://localhost:3000
```

---

# Program Flow

```
            Browser
                │
                ▼
      http://localhost:3000/?name=John
                │
                ▼
        HTTP Server receives request
                │
                ▼
       url.parse(req.url, true)
                │
     ┌──────────┴───────────┐
     │                      │
     ▼                      ▼
 pathname              query object
    "/"             { name: "John" }
     │                      │
     └──────────┬───────────┘
                ▼
      Check if "name" exists
                │
        ┌───────┴────────┐
        ▼                ▼
      Yes                No
        │                │
        ▼                ▼
 Hello John!      Hello Guest!
        │
        ▼
     Send Response
        │
        ▼
      Browser
```

---

# Sample Outputs

## Example 1

URL

```
http://localhost:3000/
```

Output

```
Path: /
Hello, Guest!
```

---

## Example 2

URL

```
http://localhost:3000/?name=Soumya
```

Output

```
Path: /
Hello, Soumya!
```

---

## Example 3

URL

```
http://localhost:3000/about?name=Rahul
```

Output

```
Path: /about
Hello, Rahul!
```

---

# Key Concepts Learned

| Concept | Description |
|----------|-------------|
| `url.parse()` | Parses the URL into different components. |
| `pathname` | Gives the requested path (e.g., `/about`). |
| `query` | Stores query parameters as an object when `true` is passed. |
| `req.url` | Contains the URL requested by the client. |
| `res.write()` | Sends data to the browser. |
| `res.end()` | Ends the HTTP response. |
| `server.listen()` | Starts the server on a specified port. |

---

# Summary

This program demonstrates **URL Handling in Node.js** by:

- Creating an HTTP server.
- Parsing the requested URL using the `url` module.
- Extracting the **path** using `pathname`.
- Extracting **query parameters** using `query`.
- Sending different responses based on the query parameter.
- Ending the response and serving it to the browser.

It is a beginner-friendly example that introduces the core concepts of URL parsing before moving on to web frameworks like Express.