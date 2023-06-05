const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }

    }]
})

UserSchema.virtual('tasks', {
    ref: 'TASK',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

UserSchema.methods.generateAuthToken = async function (){
        const user = this
        const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
        user.tokens = user.tokens.concat({token})
        await user.save() 

        return token
}

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

// Delete user tasks when user is removed
UserSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const usermodel = mongoose.model('USER',UserSchema)
module.exports = usermodel;