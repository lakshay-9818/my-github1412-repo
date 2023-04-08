import User from '../models/user.js';
import Vendor from '../models/vendors.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function profile(req, res){
    
    let user= User.findById(req.user._id)
    user.populate('favVendors')
    .exec(function(err,user){
       // console.log(user);   
        
        return res.render('user-profilePage',{titl:`Profile Page`,
            Vendor:user.favVendors, logged_In:true
        });  
       })
    
    
    };        


function addFav(req, res){      
    var id = req.query.id;  
    console.log('user is '+ req.user);
    console.log('vendor is '+ id);
    req.user.favVendors.push(id);
    User.findById(req.user._id, function(err,user){
     //console.log(user);   
        user.favVendors.push(id);
        user.save();
    });
    console.log('vendor added to user is'+ req.user.favVendors);
    req.flash('success','vendor added to user');
    
    return res.redirect('back');
}

function remFav(req, res){      
    var id = req.query.id;  
    console.log('user is '+ req.user);
    console.log('vendor is '+ id);
    
    User.findById(req.user._id, function(err,user){
       
        
        const index = user.favVendors.indexOf(id);
        user.favVendors.splice(index, 1);
        user.save();
        req.user.favVendors.splice(index, 1);
       
    });
    //console.log('vendor added to user is'+ req.user.favVendors);
    req.flash('success','removed from favourities');

    return res.redirect('back');
}


function create(req,res){
    if(req.body.password!=req.body.confirm_password){
       console.log('pasword and cnfirm password are different');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in signing up'); return;}
        if(!user){
            User.create(
                {name: req.body.name, password: req.body.password ,
                    phoneNo:req.body.phnNo,
                     email: req.body.email, gender:req.body.gender}       
                , function(err, newUser){
                    if(err){console.log('error in creating new entry'); return;}
                    console.log('******',newUser);
                    console.log(newUser.body);
                return res.redirect('/sign_in');
                });
        }
        else {return res.redirect('back');}
    });

    
}


function createSession(req,res){
    req.flash('success','Signed in successfully');
    res.redirect('/');
}

function destroySession(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','You have logged out');
      res.redirect('/');
    });
  }

async function update(req,res){
    
    try{
        let user = await User.findById(req.user._id);
    
     User.uploadedAvatar(req,res,function(err){
            if(err) console.log('*****multer Error:',err);
           
               if(req.file){
                    if(user.avatar){ 
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){                       
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));}
                    }
                    //this is sving the path of the uploaded file into the avatar field of user                               
                    user.avatar= User.avatarPath+'/'+req.file.filename;
                    
                    console.log('successfully ss');
                    req.flash('success','uploaded successfully!');
                }else {req.flash('error','please choose a file to upload');}
                user.phoneNo =req.body.phoneNo;
                if(req.body.gender)user.gender= req.body.gender;
                if(req.body.password)user.password= req.body.password;
                    user.save();
            });
            
            return res.redirect('back');
    }

    
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
  }

  export {profile,addFav,remFav,create,createSession,destroySession,update};