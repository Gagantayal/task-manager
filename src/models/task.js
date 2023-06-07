const mongoose = require("mongoose")
strictPopulate=false
const UserTask = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    
    completed:{
        type:Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'USER'
    }},
    {
        timestamps:true
    })

const usermodel = mongoose.model('TASK',UserTask);
module.exports = usermodel;