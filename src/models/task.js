const mongoose = require("mongoose")

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
    }
})

const usermodel = mongoose.model('TASK',UserTask);
module.exports = usermodel;