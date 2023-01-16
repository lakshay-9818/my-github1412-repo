const User= require('../models/user');
const Vendor = require('../models/vendors');

module.exports.signU = function(req,res){
    if(req.isAuthenticated())return res.redirect('/users/profile');
    return res.render('sign-up-page');
}
module.exports.signI = function(req,res){
    if(req.isAuthenticated())return res.redirect('/users/profile');
    return res.render('sign-in-page');
}

module.exports.profile = function(req, res){
    return res.render('user-profilePage');    
}

module.exports.addFav = function(req, res){  
    if(!req.isAuthenticated)return res.redirect('back');
    var id = req.query.id;  
     Vendor.findById(id, function(err,vendi){
        if(err)console.log('error! vendor not added to favourites');
        else req.user.favs.push(' '+vendi.name);
        console.log('added vendor:'+vendi.name+ ' to user: '+req.user.name+  ' ' +req.user.favs);
     });
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

    res.redirect('/');
}

module.exports.destroySession =function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }

// module.exports.profile= function(req,res){
//     console.log(req.cookies);
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(err){console.log('error in something'); return;}
//             if(user){return res.render('user-profilePage',{user:user});}
//         }
//         );
//     }
//     else {return res.redirect('/users/sign_in');}
// }