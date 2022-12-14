const User= require('../models/user');

module.exports.signU = function(req,res){
    return res.render('sign-up-page');
}
module.exports.signI = function(req,res){
    return res.render('sign-in-page');
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
                {name: req.body.name, password: req.body.password , email: req.body.email}       
                , function(err, newUser){
                    if(err){console.log('error in creating new entry'); return;}
                    console.log('******',newUser);
                    console.log(newUser.body);
                return res.redirect('/users/sign_in');
                });
        }
        else {return res.redirect('back');}
    });

    
}


module.exports.createSession=function(req,res){

    //find user
    User.findOne({email:req.body.email},function(err,user){
        
        if(err){console.log('error in signing up'); return;}
        //if user found
        if(user){
            if(user.password!=req.body.password){
                console.log('password not matched');
                return res.redirect('back');}
            //handle session creation
            res.cookie('user_id',user.id);//imp
            return res.redirect('/users/profile');
        }
        //if user not found
        else{console.log('user is not found');  return res.redirect('back');}
    })
}

module.exports.profile= function(req,res){
    console.log(req.cookies);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log('error in something'); return;}
            if(user){return res.render('user-profilePage',{user:user});}
        }
        );
    }
    else {return res.redirect('/users/sign_in');}
}