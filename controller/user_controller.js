const User= require('../models/user');
const Vendor = require('../models/vendors');
const fs= require('fs');
const path = require('path');



module.exports.profile = function(req, res){
    
    let user= User.findById(req.user._id)
    user.populate('favVendors')
    .exec(function(err,user){
       // console.log(user);   
        
        return res.render('user-profilePage',{titl:`Profile Page`,
            Vendor:user.favVendors, logged_In:true
        });  
       })
    
    
    };        


module.exports.addFav = function(req, res){      
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
    //  Vendor.findById(id, function(err,vendi){
    //     if(err)console.log('error! vendor not added to favourites');
    //     else req.user.favVendor= vendi;
    //     //console.log('added vendor:'+vendi.name+ ' to user: '+req.user.name+  ' ' +req.user.fav);
    //  });
    return res.redirect('back');
}

module.exports.remFav = function(req, res){      
    var id = req.query.id;  
    console.log('user is '+ req.user);
    console.log('vendor is '+ id);
    
    User.findById(req.user._id, function(err,user){
     //console.log(user);   
        
        const index = user.favVendors.indexOf(id);
        user.favVendors.splice(index, 1);
        user.save();
        req.user.favVendors.splice(index, 1);
        //req.flash('success','removed from favourities');
    });
    //console.log('vendor added to user is'+ req.user.favVendors);
    req.flash('success','vendor deleted from fav');

    return res.redirect('back');
}


module.exports.create = function(req,res){
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


module.exports.createSession=function(req,res){
    req.flash('success','Signed in successfully');
    res.redirect('/');
}

module.exports.destroySession =function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','You have logged out');
      res.redirect('/');
    });
  }


  module.exports.update= async function(req,res){
    
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
                    user.save();
                    console.log('successfully ss');
                    req.flash('success','uploaded successfully!');
                }else {req.flash('error','please choose a file to upload');}
                
            });
            
            return res.redirect('back');
    }

    
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
  }
