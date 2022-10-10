const mongoose = require('mongoose')

const UserScheama  = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[]
})

const UserModel = mongoose.model('User',UserScheama);
module.exports = UserModel