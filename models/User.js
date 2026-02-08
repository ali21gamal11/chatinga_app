const mongoose = require('mongoose');
const joi = require('joi');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:50,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:120
        
    },
    bannedList:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        default:[]
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

function validateNewUser(obj){
    const schema = joi.object({
        email:joi.string().email().min(6).max(50).trim().required(),
        name:joi.string().min(3).max(50).required(),
        age:joi.number().min(18).max(120).required(),
        password:joi.string().min(8).max(50).required().trim()
        })
        return schema.validate(obj);
}

function validateLogin(obj){
    const schema = joi.object({
        email:joi.string().email().min(6).max(50).trim().required(),
        password:joi.string().min(8).max(50).required().trim()
        })
        return schema.validate(obj);
    }

    function validateUpdateUser(obj){
    const schema = joi.object({
        email:joi.string().email().min(6).max(50).trim(),
        name:joi.string().min(3).max(50),
        age:joi.number().min(18).max(120),
        password:joi.string().min(8).max(50).trim()
        })
        return schema.validate(obj);
    }

module.exports = {
    User,validateLogin,validateNewUser,validateUpdateUser
}