const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
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
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)  
    }
    next()  
})

const usermodel = mongoose.model('USER',UserSchema)
module.exports = usermodel;