import mongoose from "mongoose";

import Vendor from "../models/vendors.js";

import multer from "multer";
import path from "path";
const AVATAR_PATH =path.join('/uploads/users/avatars');
import { fileURLToPath } from "url";
import { dirname } from "path"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNo:{
        type: Number,
       // required: true,
       // unique: true
    },
    password:{
        type: String,
        required: true        
    },
    name:{
        type: String,
        required:true
    },
    gender:{
        type: String,
      //  required:true
    },
    avatar:{ type:String},
    
    favVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }]
},
    {
        timestamps: true
    }
 );

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  //static
  userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
  userSchema.statics.avatarPath =AVATAR_PATH;

 const User = mongoose.model('User',userSchema );

 export default User;