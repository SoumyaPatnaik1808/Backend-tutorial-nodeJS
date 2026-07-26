# File Handling in Node JS 

File handling in Node JS refers to the process of creating, reading, writing, updating, deleting, and renaming files on the computer using the built-in fs (File System) module.

The fs module allows Node.js applications to interact with the operating system's file system without requiring any external libraries.

## Need of File handling 
File handling is used to:

 - Store application data.
 - Read configuration files.
 - Save user uploads.
 - Generate reports or logs.
 - Read and serve HTML, CSS, JavaScript, or JSON files.

 ## What we have done in this lecture
 We have created a main.js file which is the execution file, from this file , we have defined all the operations on text files 

### What is Encoding? 
Imagine you and your friend have a secret language where **1 = "A"**, **2 = "B"**, and **3 = "C"**. If you send your friend the numbers `8 - 5 - 25`, and they look at the secret codebook, they will translate it to **"H - E - Y"**. 

**Encoding** is exactly that! Computers are machines that only understand numbers (specifically, **0s and 1s**, called binary). Humans, on the other hand, write in words, letters, symbols, and emojis. 
Encoding is the **secret codebook** (or rule set) that tells the computer:
> "Hey! When you see this specific pattern of binary numbers, show the letter 'H' on the screen."

---

### Why is Encoding Needed?
Without encoding, computers wouldn't know how to display text. 
1. **Communication:** It ensures different computers around the world can understand each other. If you write "Hello" using a certain codebook, and someone else opens it with the *same* codebook, they will see "Hello".
2. **Avoiding Gibberish (Mojibake):** Have you ever opened a web page or file and seen weird text like `Ã©` or ``? That happens when a file is written with one encoding (one codebook) but read with another. Having a standard encoding prevents this!

---

### Common Types of Encoding (with ELI5 Descriptions)

1. **ASCII (American Standard Code for Information Interchange)**
   - **What it is:** The oldest and simplest encoding. It uses 7 bits (1 byte) for each character and can represent only 128 characters (English letters, numbers, and basic punctuation).
   - **ELI5:** It's a tiny pocket-sized dictionary that *only* speaks basic English. It has no idea what emojis or accents are.

2. **UTF-8 (Unicode Transformation Format - 8-bit)**
   - **What it is:** The king of the web! UTF-8 can represent almost any character, symbol, or emoji in existence. It is **variable-width**, meaning standard English characters take only 1 byte (making it memory efficient), while other characters and emojis use up to 4 bytes.
   - **ELI5:** The ultimate master translator. It knows English, Spanish, Chinese, Hindi, and even emojis like 😂 or 🚀. If in doubt, always use UTF-8!

3. **UTF-16**
   - **What it is:** Another way to encode Unicode characters. Instead of starting with 1 byte, it uses at least 16 bits (2 bytes) for every single character. It is commonly used internally by Windows and JavaScript.
   - **ELI5:** Similar to UTF-8, but it insists on using bigger boxes to store every character, even simple ones.

4. **Base64**
   - **What it is:** A way to represent complex binary data (like images, audio, or PDFs) using only 64 safe, printable ASCII characters.
   - **ELI5:** Packaging a delicate toy (like an image) into a safe, standard cardboard box (text format) so you can mail it safely through emails or URLs without it breaking.

---

## Detailed Explanation of `main.js` Logic

In `main.js`, we use Node.js's built-in **`fs` (File System)** module. 
Before we look at the code, let's understand a crucial concept: **Synchronous (Sync)** vs **Asynchronous (Async)**.

### ELI5: Sync vs Async
* **Synchronous (Sync / Blocking):** Imagine going to a cafe where the barista takes your order, makes your coffee, and only *then* takes the next person's order. Everyone in line has to wait. In code, a Sync function stops execution and waits until the file is completely read or written before moving to the next line.
* **Asynchronous (Async / Non-blocking):** Imagine a modern cafe. The cashier takes your order, gives you a buzzer, and immediately takes the next person's order. When your coffee is ready, the buzzer goes off (this is called a **Callback**). In code, an Async function starts the task, lets Node.js continue running other lines of code, and runs a function (callback) when the file task finishes.

Let's break down the code step-by-step:

---

### 1. Importing the File System Module
```javascript
const fs = require("fs") 
```
* **Logic:** This imports Node.js's built-in `fs` module so we can interact with files on our computer.

---

### 2. Creating and Writing to Files
#### A. Synchronous Write
```javascript
fs.writeFileSync("./text.txt" , "Hey There this is a text file") 
console.log("Done!")
```
* **Logic:** `writeFileSync` creates a file named `text.txt` (or overwrites it if it already exists) and writes `"Hey There this is a text file"` into it. 
* Because it is **Synchronous**, Node.js stops and waits until the file is fully written before running `console.log("Done!")`.

#### B. Asynchronous Write
```javascript
fs.writeFile("./text-async.txt" , "This is a async message", (err) => {
    console.log("error occured :", err)
})
console.log("Async done")
```
* **Logic:** `writeFile` starts writing to `text-async.txt` in the background. 
* It immediately prints `console.log("Async done")` **before** the writing is actually complete.
* Once the file write is completed, the callback function `(err) => { ... }` runs. If there's an error (e.g., no disk space), `err` will contain the error; otherwise, it will be `null` or `undefined`.

---

### 3. Reading Files (And why we need `"utf-8"`)
#### A. Synchronous Read
```javascript
result = fs.readFileSync("Contacts.txt", "utf-8")
console.log(result , " \n Reading done")
```
* **Logic:** `readFileSync` reads the contents of `Contacts.txt`.
* **Why `"utf-8"` is there:** If we don't provide `"utf-8"`, Node.js will read the file and return raw binary numbers (a Buffer). By passing `"utf-8"`, we tell Node.js: *"Hey, translate these binary numbers into a human-readable text string using the UTF-8 codebook!"*
* The code waits until the file is read, stores it in `result`, and then prints it.

#### B. Asynchronous Read
```javascript
fs.readFile("Contacts.txt" , "utf-8" , (err, result) => { 
    if(err) {
        console.log("Error occured" , err)
    }
    else if(result){
        console.log("Done! \n", result )
    }
    else{
        console.log("No data found")
    }
})
```
* **Logic:** `readFile` starts reading `Contacts.txt` asynchronously with `"utf-8"` encoding.
* When reading is done, it calls the callback function, providing:
  * `err`: The error object (if something went wrong, like if the file doesn't exist).
  * `result`: The actual text content of the file.
* Inside the callback, we check if there's an error. If not, we print the text.

---

### 4. Appending (Adding) to a File
Appending means adding text to the **end** of a file without deleting what is already there.

#### A. Synchronous Append
```javascript
fs.appendFileSync("Contacts.txt" , "\nThis is a new line added to the file")
```
* **Logic:** Adds a new line (`\n` starts a new line) to `Contacts.txt` synchronously.

#### B. Asynchronous Append
```javascript
fs.appendFile("Contacts.txt" , "\nThis is a new line added to the file using async call" , (err) => {
    if(err){
        console.log("Error occured" , err)
    }
    else{
        console.log("Append operation done using async call")
    }
})
```
* **Logic:** Appends a new line in the background and runs the callback function when finished to let us know if it succeeded or failed.

---

### 5. Copying Files
#### A. Synchronous Copy
```javascript
fs.cpSync("Contacts.txt" , "Contacts-copy.txt")
```
* **Logic:** Creates a duplicate of `Contacts.txt` named `Contacts-copy.txt` synchronously.

#### B. Asynchronous Copy
```javascript
fs.cp("Contacts.txt" , "Contacts-copy-async.txt" , (err) => {
    if(err){
        console.log("Error occured" , err)
    }
    else{
        console.log("Copy operation done using async call")
    }
})
```
* **Logic:** Duplicates `Contacts.txt` to `Contacts-copy-async.txt` asynchronously and triggers the callback when done.

---

### 6. Deleting, Stats, and Folders
#### Deleting a File (Unlinking)
```javascript
fs.unlinkSync("Contacts-copy.txt")
```
* **Logic:** Deletes (unlinks) the file `Contacts-copy.txt` synchronously.

#### Getting File Information (Stats)
```javascript
console.log(fs.statSync("Contacts.txt"))
```
* **Logic:** Gets metadata about the file (like file size, when it was created, and whether it's a file or folder) and prints it.

#### Creating a Directory (Folder)
```javascript
fs.mkdirSync("newFolder")
```
* **Logic:** Creates a new folder named `newFolder` synchronously.
