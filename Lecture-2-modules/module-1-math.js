function add(a,b){ 
    return a+b
}

function sub(a,b){
    return a-b
}

//Modular Programming 
// Modular programming in Node.js is a software development approach in which an application is divided into separate, self-contained modules. Each module performs a specific task and can export its functionality using module.exports (or export) and import functionality from other modules using require() (or import), resulting in code that is reusable, maintainable, and easier to manage.

module.exports = {
    AddFn : add, 
    SubFn : sub 
} // we have stored all the modules in objects and defined them with a particular key,value pair so that we can use the key in the importing file