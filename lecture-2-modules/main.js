const math = require('./module-1-math')  //we have defined and stored our module-1-math.js file in a variable named math , so, we can use the functions in it , we must have to export it form the parent file

//we can also destructure math file to its functions i.e add and sub , as : const {add,sub} = require("./module-1/math") what will be the advantage of writing like this will be , i can directly call add and sub function instead of math.add or math.sub

console.log("The math value is: ", math.AddFn(2,3))

