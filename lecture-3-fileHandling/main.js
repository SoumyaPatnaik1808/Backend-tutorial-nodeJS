const fs = require("fs") 

//Sync. call 
fs.writeFileSync("./text.txt" , "Hey There this is a text file") // Creates a file named text.txt and writes the message: "Hey There, this is a text file" 

console.log("Done!")


//Async call 
fs.writeFile("./text-async.txt" , "This is a async message", (err)=>{console.log("error occured :", err)})
console.log("Async done")


//Read File actions : Sync. Call
result = fs.readFileSync("Contacts.txt", "utf-8")
console.log(result , " \n Reading done") //we can store the result in a variable and print it later.

//Read File Async call 

fs.readFile("Contacts.txt" , "utf-8" , (err,result)=>{ 
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
//we can use the callback function to handle the result of the readFile operation. The callback function takes two parameters: err and result. If there is an error, it will be passed to the err parameter, and if the operation is successful, the result will be passed to the result parameter.

//Append file actions : Sync. Call

fs.appendFileSync("Contacts.txt" , "\nThis is a new line added to the file") // Appends a new line to the existing file "Contacts.txt"

//Append file actions : Async. Call 
fs.appendFile("Contacts.txt" , "\nThis is a new line added to the file using async call" , (err)=>{
    if(err){
        console.log("Error occured" , err)
    }
    else{
        console.log("Append operation done using async call")
    }
})

// Copy file actions : Sync. Call 

fs.cpSync("Contacts.txt" , "Contacts-copy.txt") // Copies the contents of "Contacts.txt" to a new file named "Contacts-copy.txt"

// Copy file actions : Async. Call
fs.cp("Contacts.txt" , "Contacts-copy-async.txt" , (err)=>{
    if(err){
        console.log("Error occured" , err)
    }
    else{
        console.log("Copy operation done using async call")
    }
})

//More functions : 
fs.unlinkSync("Contacts-copy.txt") // Deletes the file "Contacts-copy.txt" synchronously , async also there

console.log(fs.statSync("Contacts.txt")) // Returns the stats of the file "Contacts.txt" synchronously , async also there  

fs.mkdirSync("newFolder") // Creates a new folder named "newFolder" synchronously , async also there