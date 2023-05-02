const mongoose = require("mongoose")
const validator = require('validator')

const usermodel = new mongoose.model('USER',{
    name:{
        type:String
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
               throw new error('email') 
            }
        }
    },
    phone:{
        type:Number
    }
})
//const usermodel = mongoose.model('usermodel',UserSchema);
module.exports = usermodel;