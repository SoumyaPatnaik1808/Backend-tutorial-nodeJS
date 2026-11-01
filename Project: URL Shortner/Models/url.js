const mongoose = require('mongoose') ; 

//Mongoose schema
const Urlschema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true
  }, 

  redirectURL:{
      type:String, 
      required : true
  } , 

  visitHistory : [{timestamp: {type: Date , default: Date.now()}}] , 

  
} , 
{timestamps:true}
)

// Model creation
const Url = mongoose.model('Url' , Urlschema); 

module.exports = Url; 
