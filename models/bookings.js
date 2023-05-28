import mongoose from "mongoose";

// created a schema for collection 
const bookingSchema= new mongoose.Schema({
vendor:{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
date:{type: Date, required:true}
}, {timestamps: true});


// Interview is our collection here with schema as interviewSchema
const Booking = mongoose.model('Booking',bookingSchema );

export default Booking;