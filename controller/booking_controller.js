import Booking from "../models/bookings.js";
import Vendor from '../models/vendors.js';


async function createBooking(req, res){      
    var id = req.query.id;  
    console.log('user is '+ req.user);
    console.log('vendor is '+ id);
    
    let booking=  await Booking.create({
        vendor:id,
    user:req.user._id,
    date: req.body.date
    });
   
    console.log('booking created');
    req.flash('success','booking created');
    
    return res.redirect('back');
}

function closeBooking(req,res){
    
    var id = req.query.id;
    
    Booking.findByIdAndDelete(id,(err, booking)=> {
        if (err){
            console.log(err);
            return;
        }
        else{
            Vendor.findById(booking.vendor,(err,vendi)=>{
              if(err){console.log(err); return;}
               var x= (Number(req.body.vol)+vendi.star*vendi.rating)/(vendi.rating+1);
               var rounded = Math.round(x * 10) / 10
               vendi.star=rounded;
               vendi.rating++;
               vendi.save();
            })
        }
    });

    console.log('Vendor rated and booking closed');
    req.flash('success','Vendor rated and booking closed');
    
    return res.redirect('back');
}

export {createBooking,closeBooking};