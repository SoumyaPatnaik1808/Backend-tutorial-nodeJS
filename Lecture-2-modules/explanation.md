# Modular Programming 

In this lecture, we are going to study about the modular programming in node js 

Modular programming in Node.js is a software development approach in which an application is divided into separate, self-contained modules. Each module performs a specific task and can export its functionality using module.exports (or export) and import functionality from other modules using require() (or import), resulting in code that is reusable, maintainable, and easier to manage. 

## How we have implemented modular programming here : 

Here we have created two files, 
math.js -> to store all the mathematical functions in here, so that the mathematical functions can be fetched       from here and 
we have the main.js ---> where we have imported this math file to perform all the operations 

### Math file (The file used for storing all the mathematical functions for the logical stuffs)  
    - Here all the logics of the mathematical operations are stored 

    - we have here "module.export{object}" , what it does? , simply it exports all the modules basically all the functions in here the add and sub functions that does addition and subtraction works , we have stored in key and value pairs basically 

### Main.js file --> The center of execution 

       - Here we have used all the logics of diffrent mathematical operations to do various functions 
       - we have imported the principle file i.e the math file by "require" and then called AddFn and SubFn for the operations 