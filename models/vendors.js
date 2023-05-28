import mongoose from "mongoose";
// created a schema for collection 
const vendorSchema= new mongoose.Schema({
name:{ type:String, required:true },
phone:{type: Number, required:true},
pin:{ type: Number, required: true},
cardNo:{type: Number, required:true},
skill:{type:String, required:true},
rating:{type:Number, default:"5"},
star: {type:Number, default:"4"}
},
{
    timestamps: true
}
);

// Vendor is our collection here with schema as vendorSchema
const Vendor = mongoose.model('Vendor',vendorSchema );

export default Vendor;