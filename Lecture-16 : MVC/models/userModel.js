const express = require('express'); 
const mongoose = require('mongoose'); 


//Schema for user data 
const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required : true
    },

    last_name:{
        type:String, 
        required : false,
    },

    email:{
        type : String, 
        required: true, 
        unique : true 
    }, 
    job_title:{
        type : String, 
        required : true, 

    },
    gender:{
         type: String, 
         
    }, 
 
    timestamps: true // gives the createdAt and updatedAt fields automatically
}) 


const userModel = mongoose.model('User', userSchema);

module.exports = userModel; 
