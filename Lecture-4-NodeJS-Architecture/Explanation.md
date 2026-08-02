# Node.js Architecture (Beginner Friendly)

## What is Node.js?

Node.js is a **JavaScript Runtime Environment**. It allows us to run JavaScript **outside the browser**, mainly for building backend applications like APIs, web servers, chat apps, etc.

---

# Why is Node.js Fast?

Node.js is fast because it uses:

- **V8 Engine** → Executes JavaScript code.
- **libuv** → Handles asynchronous tasks.
- **Event Loop** → Manages completed tasks and callbacks.
- **Thread Pool** → Performs heavy background operations.

Instead of waiting for slow operations (like reading files or database queries), Node.js continues executing other code.

---

# High-Level Architecture

```text
                Your JavaScript Code
                        │
                        ▼
                 +----------------+
                 |   V8 Engine    |
                 | Executes JS    |
                 +----------------+
                        │
        ┌───────────────┴────────────────┐
        │                                │
 Synchronous Code                Asynchronous Code
(console.log, loops)       (File, DB, Network, Timer)
        │                                │
        ▼                                ▼
 Executes Immediately              libuv
                              (Handles async work)
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                   Operating System         Thread Pool
                 (Network Requests)   (File System, Crypto,
                                        DNS, Compression)
                         │                         │
                         └────────────┬────────────┘
                                      ▼
                               Event Loop
                                      │
                                      ▼
                             Callback Queue
                                      │
                                      ▼
                              Executes Callback
```

---

# Components of Node.js Architecture

## 1. V8 Engine

The V8 Engine is developed by Google.

Its job is to:

- Read JavaScript code.
- Convert it into machine code.
- Execute the machine code.

Without V8, Node.js cannot understand JavaScript.

### Example

```javascript
console.log("Hello");
```

The V8 Engine executes this immediately.

Think of V8 as the **brain** of Node.js.

---

## 2. Call Stack

Whenever JavaScript runs, functions are pushed into the **Call Stack**.

Example:

```javascript
function greet() {
    console.log("Hello");
}

greet();
```

Execution:

```text
Call Stack

┌────────────┐
│ greet()    │
├────────────┤
│ Global     │
└────────────┘
```

After `greet()` finishes, it is removed from the stack.

The Call Stack always executes **one function at a time**.

---

# Is Node.js Single Threaded?

Yes.

JavaScript code runs on **one main thread**.

That means:

- One Call Stack
- One JavaScript execution thread

But Node.js can still handle thousands of users because it does **not** perform slow tasks itself.

Instead, it gives them to **libuv**.

---

# 3. libuv

libuv is a C library used by Node.js.

It provides:

- Event Loop
- Thread Pool
- Non-blocking I/O
- Timers
- File System APIs
- Networking APIs

You can think of libuv as the **manager** that handles all background work.

---

# 4. Synchronous Operations

These run immediately.

Example:

```javascript
console.log("One");
console.log("Two");
console.log("Three");
```

Output:

```
One
Two
Three
```

Each statement waits for the previous one to finish.

---

# 5. Asynchronous Operations

Some operations take time.

Examples:

- Reading files
- Database queries
- HTTP requests
- API calls
- Timers

Instead of blocking JavaScript, Node.js sends them to **libuv**.

Example:

```javascript
const fs = require("fs");

fs.readFile("data.txt", () => {
    console.log("File Read");
});

console.log("Done");
```

Output:

```
Done
File Read
```

Why?

Because reading the file happens in the background.

---

# 6. Operating System

Some operations can be handled directly by the Operating System.

Examples:

- Network requests
- Socket communication

The OS notifies Node.js when the task is complete.

---

# 7. Thread Pool

Not every task can be handled by the Operating System.

Tasks like:

- File System
- Password Hashing
- Compression
- DNS Lookup

are handled by libuv's **Thread Pool**.

By default, the thread pool has **4 worker threads**, though this can be configured. :contentReference[oaicite:0]{index=0}

Example:

```javascript
fs.readFile("data.txt");
```

The file reading is assigned to one of these worker threads.

---

# 8. Event Loop

The Event Loop is the **heart of Node.js**.

Its job is simple:

- Check if the Call Stack is empty.
- If empty, take the next completed callback.
- Push it onto the Call Stack.

It keeps repeating this process.

```text
while (true) {

    Is Call Stack Empty?

           Yes
            │
            ▼

Take Callback from Queue

            │
            ▼

Push to Call Stack

}
```

The Event Loop keeps Node.js responsive by coordinating completed asynchronous tasks. :contentReference[oaicite:1]{index=1}

---

# 9. Callback Queue

When an asynchronous task finishes, its callback is placed into the **Callback Queue**.

Example:

```javascript
setTimeout(() => {
    console.log("Hello");
}, 2000);
```

After 2 seconds:

```text
Callback Queue

┌──────────────┐
│ console.log  │
└──────────────┘
```

The Event Loop waits until the Call Stack is empty before executing it.

---

# Complete Flow

Example:

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("demo.txt", () => {
    console.log("Reading Complete");
});

console.log("End");
```

### Step 1

```
Start
```

V8 executes it.

---

### Step 2

Node.js sees:

```javascript
fs.readFile()
```

It sends the task to **libuv**.

---

### Step 3

libuv gives the work to:

- Operating System
- or Thread Pool

depending on the task.

---

### Step 4

JavaScript keeps running.

```
End
```

is printed immediately.

---

### Step 5

File reading finishes.

The callback moves into the Callback Queue.

---

### Step 6

The Event Loop notices:

- Call Stack is empty.

So it pushes the callback onto the Call Stack.

Output:

```
Reading Complete
```

Final Output:

```
Start
End
Reading Complete
```

---

# Why Node.js Can Handle Many Users

Imagine a restaurant.

### Traditional Server

One waiter serves one customer completely before serving another.

Everyone else waits.

---

### Node.js

One waiter takes everyone's orders.

While the food is cooking, the waiter serves other customers.

When food is ready, the waiter delivers it.

Nobody waits unnecessarily.

This is exactly how Node.js works.

---

# Advantages of Node.js Architecture

- Very fast for I/O operations
- Non-blocking execution
- Can handle thousands of concurrent users
- Uses less memory
- Excellent for APIs, chat apps, streaming, and real-time applications

---

# Limitations

Node.js is **not ideal for CPU-intensive tasks** because JavaScript runs on a single main thread.

Heavy computations (large loops, image/video processing, etc.) can block the Event Loop and delay other requests.

---

# Quick Revision

| Component | Responsibility |
|-----------|----------------|
| V8 Engine | Executes JavaScript |
| Call Stack | Runs JavaScript functions |
| libuv | Handles asynchronous operations |
| Operating System | Performs network I/O |
| Thread Pool | Performs file system, crypto, DNS, compression tasks |
| Event Loop | Moves completed callbacks to the Call Stack |
| Callback Queue | Stores completed callbacks waiting to execute |

---

# One-Line Summary

> **Node.js executes JavaScript using the V8 Engine, delegates slow operations to libuv (using the OS or a thread pool), and uses the Event Loop to execute callbacks once those operations finish—allowing it to handle many requests efficiently without blocking the main thread.**