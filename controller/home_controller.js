import Citizen from '../models/citizen.js';
import Vendor from '../models/vendors.js';

function home(req, res){
    
    Vendor.find({}, function(err, vendors){

        if(err){console.log('er is encountered'); return; }

        if(req.isAuthenticated())  {
           
                return res.render('home',{  titl:`Home `,          
                    contact_List: vendors ,logged_In: true
                } );
         
              }

        else  {
               return res.render('home',{   titl:`Home`,         
            contact_List: vendors ,logged_In: false
        } );}
     });
}



 function newVpage(req,res){let loggin=false;
    if(req.user)loggin= true;
    return res.render('V-Registration',
    {
        titl:`Professional's Registration `,logged_In: loggin
    });
}

 function createVendor(req,res)
{ //checking if cardNo is already used
    Vendor.findOne({cardNo:req.body.cardNo}, function(err,vendor){
        if(err){req.flash('error','error in checking up duplicacy'); return;}
        
        if(!vendor){ 
            //once confirmed that cardNo is not used we now have to check if cardNo
            //is valid [present in citizen DB] 
            //commented until next commit
            // Citizen.findOne({cardNo:req.body.cardNo},function(err,citizen){
            //      if(err){console.log('error in checking up citizenship'); return;}
            //      if(citizen){
            //         //citizenship is present in citizenDB so create a vendor
                    Vendor.create(
    
                        // {name: req.body.name, phone: req.body.phone , pin: req.body.pin 
                        //     , skill: req.body.skill, cardNo: req.body.cardNo}
                        req.body
                        , function(err, newVendor){
                        if(err){console.log('error in creating new entry'); return;}
                        req.flash('success','Successfully registered');
                        return res.redirect('/');
                        });
            //     }
            //     //commented until next commit
            //     //else{req.flash('error','cardNo is fake'); return res.redirect('back');}
            // });

        }

        else { req.flash('error','cardNo is already used'); return res.redirect('back');}
    });   
    
}


function deleteV(req,res){
    let id = req.query.id;
    Vendor.findByIdAndDelete(id, function(err){
       if(err){console.log('error while deleting it'); return;}
       console.log('deleted successfully');    
    });
    return res.redirect('back');
   }


function vendorReqq(req,res){

    console.log(req.query.pinReqq);
    Vendor.find({ pin: req.query.pinReqq,skill:req.query.skillReqq}, function(err, vendors){

        if(err){console.log('er is encountered'); return; }

        if(req.isAuthenticated())  {
               return res.render('home',{ titl:`Home`,           
            contact_List: vendors ,logged_In: true
        } );}

        else  {
               return res.render('home',{titl:`Home`,            
            contact_List: vendors ,logged_In: false
        } );}
     });
}

function signU(req,res){
    if(req.user)return res.redirect('/users/profile');
    return res.render('sign-up-page',{titl:`SignUp`,logged_In:false});
}
function signI(req,res){
    if(req.user)return res.redirect('/users/profile');
    return res.render('sign-in-page',{titl:`LogIn `,logged_In:false});
}

export {signI,signU ,vendorReqq,deleteV, createVendor,newVpage,home};
