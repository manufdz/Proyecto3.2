const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:15,
},
surname:{
    type:String,
    required:true,
    minlenght:5,
    maxlenght:25,
},
age:{
    type:Number,
    required:true,    
},
email:{
    type:String,
    require:true,
    minlenght:5,
    maxlenght:25,
},
phonenumber:{
    type:Number,
    require:true,
},
adress:{
    type:String,
    minlenght:5,
    maxlenght:25,
},
zipcode:{
    type:Number,

},
password:{
    type:String,
    require:true,
}
},{timestamps:true})


module.exports = mongoose.model("User",userSchema)