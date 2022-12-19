const mongoose= require('mongoose');
// created a schema for collection 
const citizenSchema= new mongoose.Schema({
name:{ type:String, required:true },
cardNo:{type: Number, required:true},
city:{type:String, required:true }
}
);

// Citizen is our collection here with schema as citizenSchema
const Citizen = mongoose.model('Citizen',citizenSchema );

module.exports = Citizen;
