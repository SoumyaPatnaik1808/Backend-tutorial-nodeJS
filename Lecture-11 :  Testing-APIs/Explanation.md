# Testing REST API Requests Using Postman

## Objective

In this lecture, we will learn how to **test REST API endpoints using Postman**. So far, we have created a simple REST API using **Express.js**, where the `MOCK_DATA.json` file acts as our database.

Instead of creating a real database, we are reading user data from a JSON file. This allows us to focus on understanding how REST APIs work before introducing databases like MongoDB or MySQL.

By the end of this lecture, you will know how to send API requests using Postman and inspect the responses returned by your Express server.

---

# Project Overview

We have built an Express server with multiple routes that demonstrate different REST API concepts.

### Technologies Used

- Node.js
- Express.js
- Postman
- JSON File (`MOCK_DATA.json`) as a mock database

---

# Code Overview

The API contains the following routes:

| HTTP Method | Route | Purpose |
|-------------|-------|---------|
| GET | `/` | Returns the Home Page |
| GET | `/users` | Displays user names in HTML format |
| GET | `/api/users` | Returns all users in JSON format |
| GET | `/api/users/:id` | Returns a specific user using a dynamic route parameter |

It also contains placeholders for the remaining REST operations:

- POST
- PATCH
- DELETE

These will be implemented in the upcoming lectures.

---

# Starting the Server

Run the application using:

```bash
node index.js
```

If everything is configured correctly, the terminal will display:

```text
Server is running in port 8000
```

Your server is now available at:

```
http://localhost:8000
```

---

# What is Postman?

Postman is an API testing tool that allows developers to send HTTP requests to a server without creating a frontend application.

Instead of writing HTML or JavaScript to test an API, Postman lets you:

- Send GET requests
- Send POST requests
- Send PATCH requests
- Send DELETE requests
- View JSON responses
- Check HTTP status codes
- Test APIs quickly during development

---

# Testing the API

## 1. Testing the Home Route

### Request

Method:

```
GET
```

URL

```
http://localhost:8000/
```

### Expected Response

```
This is home page
```

This confirms that the Express server is running successfully.

---

## 2. Testing `/users`

### Request

```
GET
```

```
http://localhost:8000/users
```

### What this route does

This route generates an HTML unordered list containing all user names.

The code:

```javascript
const html = `<ul>
    ${users.map(user => `${user.first_name}`).join("")}
</ul>`;
```

creates an HTML string dynamically from the JSON data.

### Expected Response

Instead of JSON, you'll receive an HTML page similar to:

```html
<ul>
Soumya
Rahul
Ankit
Riya
</ul>
```

Since the response is HTML, browsers will render it as a webpage.

---

## 3. Testing `/api/users`

### Request

```
GET
```

```
http://localhost:8000/api/users
```

### What this route does

This endpoint returns the complete list of users in JSON format.

```javascript
res.json(users);
```

Express automatically converts the JavaScript object into JSON.

### Expected Response

```json
[
  {
    "id": 1,
    "first_name": "Soumya"
  },
  {
    "id": 2,
    "first_name": "Rahul"
  }
]
```

This is the route that frontend applications usually consume.

---

# Testing Dynamic Route Parameters

The following route:

```javascript
app.get("/api/users/:id", ...)
```

contains a **dynamic path parameter**.

The value after `/users/` is stored inside:

```javascript
req.params.id
```

---

## Example 1

### Request

```
GET
```

```
http://localhost:8000/api/users/5
```

The server extracts:

```javascript
const id = req.params.id;
```

It then searches the JSON data:

```javascript
const user = users.find(user => user.id == id);
```

### Expected Response

```json
{
    "id":5,
    "first_name":"John",
    "last_name":"Doe"
}
```

---

## Example 2

Request a user that does not exist.

```
GET
```

```
http://localhost:8000/api/users/500
```

Since no user exists with ID 500, the following code executes:

```javascript
res.status(404).json({
    message: "User not found"
});
```

### Expected Response

Status Code:

```
404 Not Found
```

Response Body

```json
{
    "message": "User not found"
}
```

This demonstrates how APIs communicate errors using HTTP status codes.

---

# Routes Planned for Future Lectures

Although they are not implemented yet, the project already includes placeholders for the remaining REST operations.

```javascript
app.route("/api/users")
.get(...)
.patch(...)
.post(...)
.delete(...)
```

These methods will be covered in the next lectures.

---

## POST Request

Purpose:

Create a new user.

Example:

```
POST /api/users
```

---

## PATCH Request

Purpose:

Update an existing user.

Example:

```
PATCH /api/users/5
```

---

## DELETE Request

Purpose:

Delete an existing user.

Example:

```
DELETE /api/users/5
```

---

# Why Use `app.route()`?

Instead of writing separate route definitions like:

```javascript
app.get("/api/users", ...);

app.post("/api/users", ...);

app.patch("/api/users", ...);

app.delete("/api/users", ...);
```

Express allows us to group all operations for the same endpoint together:

```javascript
app.route("/api/users")
    .get(...)
    .post(...)
    .patch(...)
    .delete(...);
```

### Advantages

- Cleaner code
- Better organization
- Easier to maintain
- All operations for a single resource stay together

---

# Understanding the Flow

```
Postman
    │
    │  HTTP Request
    ▼
Express Server
    │
    │ Reads data from
    ▼
MOCK_DATA.json
    │
    │ Sends JSON/HTML Response
    ▼
Postman
```

Every request follows this same lifecycle:

1. Postman sends an HTTP request.
2. Express receives the request.
3. The appropriate route executes.
4. Data is fetched from `MOCK_DATA.json`.
5. Express returns an HTML or JSON response.
6. Postman displays the response along with the HTTP status code.

---

# Key Takeaways

- We are using **Postman** to test our REST API without building a frontend.
- `MOCK_DATA.json` acts as a temporary database.
- The API currently supports four **GET** routes.
- `/users` returns data as **HTML**.
- `/api/users` returns data as **JSON**.
- `/api/users/:id` demonstrates **dynamic route parameters**.
- Invalid user IDs return a **404 Not Found** response.
- Future lectures will implement the **POST**, **PATCH**, and **DELETE** endpoints to complete the CRUD operations.