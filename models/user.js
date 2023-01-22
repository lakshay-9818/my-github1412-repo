const mongoose = require('mongoose');

const Vendor= require('../models/vendors');

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true        
    },
    name:{
        type: String,
        required:true
    },
    fav:{type: Array }
    //fav: []
},
    {
        timestamps: true
    }
 );

 const User = mongoose.model('User',userSchema );

module.exports = User;