const Citizen = require('../models/citizen');
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
{ //checking if cardNo is already used
    Vendor.findOne({cardNo:req.body.cardNo}, function(err,vendor){
        if(err){console.log('error in checking up duplicacy'); return;}
        
        if(!vendor){
            //once confirmed that cardNo is not used we now have to check if cardNo
            //is valid [present in citizen DB] 
            Citizen.findOne({cardNo:req.body.cardNo},function(err,citizen){
                if(err){console.log('error in checking up citizenship'); return;}
                if(citizen){
                    //citizenship is present in citizenDB so create a vendor
                    Vendor.create(
    
                        {name: req.body.name, phone: req.body.phone , pin: req.body.pin 
                            , skill: req.body.skill, cardNo: req.body.cardNo}
                        
                        , function(err, newVendor){
                        if(err){console.log('error in creating new entry'); return;}
                        console.log('******',newVendor);
                        return res.redirect('/');
                        });
                }
                else{console.log('cardNo is fake'); return res.redirect('back');}
            });

        }

        else { console.log('cardNo is already used'); return res.redirect('back');}
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

// module.exports.tackle= function(req,res){
//     let id = req.query.id;
//     if(id=='sign-in')return res.render('sign-in-page');
//     else return res.render('sign-up-page');
// }

module.exports.signin= function(req,res){ return res.render('sign-in-page');}
module.exports.signup= function(req,res){ return res.render('sign-up-page');}