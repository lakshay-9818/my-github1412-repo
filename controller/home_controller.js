const Vendor= require('../models/vendors');

module.exports.home = function(req, res){
    console.log(req.cookies);
    Vendor.find({/*pin: "110033"*/}, function(err, vendors){
        if(err){console.log('er is encountered'); return; }
        return res.render('home',{            
            contact_List: vendors
        } );
     });
}

module.exports.newVpage= function(req,res){
    return res.render('V-Registration',
    {
        title:`ServiceHub | Professional's Registration `
    });
}

module.exports.createVendor = function(req,res)
{    Vendor.create(
    
    {name: req.body.name, phone: req.body.phone , pin: req.body.pin , skill: req.body.skill}
    
    , function(err, newVendor){
    if(err){console.log('error in creating new entry'); return;}
    console.log('******',newVendor);
    return res.redirect('/');
    });
    
}

module.exports.deleteV = function(req,res){
    let id = req.query.id;
    Vendor.findByIdAndDelete(id, function(err){
       if(err){console.log('error while deleting it'); return;}
       console.log('deleted successfully');    
    });
    return res.redirect('back');
   }


module.exports.signin= function(req,res){ return res.render('sign-in-page');}
module.exports.signup= function(req,res){ return res.render('sign-up-page');}

