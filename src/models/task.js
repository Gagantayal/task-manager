const mongoose = require("mongoose")

const UserTask = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    
    completed:{
        type:Boolean,
        default:false
    }
})

const usermodel = mongoose.model('TASK',UserTask);
module.exports = usermodel;