const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
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

UserSchema.statics.findByCredentials = async (email,password)=>{
    const user = await usermodel.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}


UserSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)  
    }
    next()  
})

const usermodel = mongoose.model('USER',UserSchema)
module.exports = usermodel;