# RESTful API – Beginner Friendly Guide

## What is a RESTful API?

A **RESTful API** is a way for two applications to communicate over the internet using standard HTTP methods (like GET, POST, PUT, and DELETE).

Think of it as a **waiter in a restaurant**:

- **Client (Customer)** → Requests food.
- **API (Waiter)** → Takes the request to the kitchen.
- **Server (Kitchen)** → Prepares the food.
- **API (Waiter)** → Brings the response back to the customer.

The client never directly interacts with the server's database—it always communicates through the API.

---

# What does REST mean?

**REST** stands for:

> **RE**presentational **S**tate **T**ransfer

It is an architectural style introduced by **:contentReference[oaicite:0]{index=0}** in the year 2000 for designing web services.

REST defines a set of rules (constraints) that APIs should follow to make them simple, scalable, and easy to maintain.

When an API follows these REST principles, it is called a **RESTful API**.

---

# Why do we need RESTful APIs?

Imagine you have an e-commerce website.

Different applications need the same data:

- Website
- Android app
- iOS app
- Admin Dashboard

Instead of each application directly accessing the database (which is unsafe), they all communicate through a REST API.

```
Website
      \
Android App -----> REST API -----> Database
      /
iOS App
```

Benefits:

- Secure
- Organized
- Reusable
- Easy to scale

---

# What is a Resource?

In REST, everything is treated as a **resource**.

Examples:

| Resource | URL |
|----------|------|
| Users | `/users` |
| Products | `/products` |
| Orders | `/orders` |
| Books | `/books` |

A resource is simply an object or data that the server manages.

---

# HTTP Methods in REST

REST uses HTTP methods to tell the server what action to perform.

---

## 1. GET

Used to **retrieve data**.

Example:

```
GET /users
```

Response:

```json
[
    {
        "id":1,
        "name":"Soumya"
    },
    {
        "id":2,
        "name":"Rahul"
    }
]
```

Meaning:

> "Give me all users."

---

## 2. POST

Used to **create new data**.

Example:

```
POST /users
```

Request Body:

```json
{
    "name":"Ankit",
    "age":20
}
```

Meaning:

> "Create a new user."

---

## 3. PUT

Used to **replace/update an entire resource**.

Example:

```
PUT /users/1
```

Request:

```json
{
    "name":"Soumya",
    "age":21
}
```

Meaning:

> Replace all information of User 1.

---

## 4. PATCH

Used to **update only specific fields**.

Example:

```
PATCH /users/1
```

Request:

```json
{
    "age":22
}
```

Meaning:

Only update the age.

---

## 5. DELETE

Used to remove data.

Example:

```
DELETE /users/1
```

Meaning:

Delete User 1.

---

# Summary of HTTP Methods

| Method | Purpose |
|----------|----------|
| GET | Read data |
| POST | Create data |
| PUT | Replace existing data |
| PATCH | Update part of data |
| DELETE | Delete data |

---

# Example REST API URLs

Suppose we have a Users API.

### Get all users

```
GET /users
```

---

### Get one user

```
GET /users/5
```

---

### Create a user

```
POST /users
```

---

### Update user

```
PUT /users/5
```

---

### Delete user

```
DELETE /users/5
```

Notice how the URL stays almost the same.

The **HTTP method** decides what action to perform.

---

# REST Principles (Constraints)

A RESTful API generally follows these principles:

## 1. Client-Server Architecture

The client and server are separate.

```
Client  <------>  Server
```

The client requests data.

The server processes the request.

---

## 2. Stateless

Every request is independent.

The server **does not remember previous requests**.

Example:

```
Request 1
↓

Server responds

Request 2
↓

Server treats it as a completely new request.
```

Each request must include everything needed (such as authentication).

---

## 3. Cacheable

Responses can be cached.

Example:

```
GET /products
```

Since product data doesn't change every second, the browser can temporarily store (cache) it.

Benefits:

- Faster loading
- Less server load

---

## 4. Uniform Interface

REST APIs should use consistent URL patterns.

Good examples:

```
/users
/users/1
/products
/products/10
/orders
```

Avoid action verbs in URLs like:

```
/getUsers
/createUser
/deleteUser
```

Instead, use nouns and let the HTTP method describe the action.

---

## 5. Layered System

The client doesn't need to know whether the request passes through:

- Authentication server
- Load balancer
- Cache server
- Main server

It simply sends the request.

```
Client
   |
Load Balancer
   |
Authentication
   |
API Server
   |
Database
```

---

# HTTP Status Codes

The server tells the client whether the request succeeded.

## Success

| Code | Meaning |
|------|----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |

---

## Client Errors

| Code | Meaning |
|------|----------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

---

## Server Errors

| Code | Meaning |
|------|----------|
| 500 | Internal Server Error |

---

# Complete Request Flow

Suppose a user wants all books.

### Step 1

Browser sends:

```
GET /books
```

↓

### Step 2

API receives request.

↓

### Step 3

API asks the database.

```
SELECT * FROM Books
```

↓

### Step 4

Database returns data.

↓

### Step 5

API converts it into JSON.

↓

### Step 6

Client receives:

```json
[
    {
        "id":1,
        "title":"Node.js Guide"
    },
    {
        "id":2,
        "title":"JavaScript Basics"
    }
]
```

---

# REST API Example in Node.js

```javascript
const express = require("express");
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Soumya" },
    { id: 2, name: "Rahul" }
];

// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST new user
app.post("/users", (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    users = users.filter(user => user.id != req.params.id);
    res.send("User Deleted");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---

# Advantages of RESTful APIs

- Simple and easy to understand.
- Uses standard HTTP methods.
- Platform-independent (works with web, mobile, desktop, etc.).
- Scalable because requests are stateless.
- Supports JSON, the most common data format.
- Easy to test using tools like Postman.

---

# REST vs Traditional Websites

| Traditional Website | REST API |
|----------------------|----------|
| Returns HTML pages | Returns data (usually JSON) |
| Meant for browsers | Meant for applications |
| User sees webpage | Client processes the data |
| Server renders UI | Client renders UI |

---

# Real-Life Example

Imagine a food delivery app.

```
Customer opens app
        ↓
GET /restaurants
        ↓
Server returns restaurant list
        ↓
Customer clicks one restaurant
        ↓
GET /restaurants/5/menu
        ↓
Menu appears
        ↓
Customer places order
        ↓
POST /orders
        ↓
Order is created
        ↓
Customer cancels order
        ↓
DELETE /orders/15
```

Every interaction is just an HTTP request to a resource.

---

# Key Takeaways

- REST stands for **Representational State Transfer**.
- A RESTful API allows applications to communicate over HTTP.
- Resources are identified by URLs (e.g., `/users`, `/products`).
- HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) define the action to perform.
- Requests are **stateless**, meaning the server doesn't store client session information between requests.
- Responses typically use **JSON**.
- RESTful APIs are widely used for building web services because they are simple, scalable, and easy to integrate across different platforms.