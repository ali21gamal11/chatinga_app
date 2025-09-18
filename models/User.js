const mongoose = require('mongoose');
const joi = require('joi');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        minlength:6,
        maxlingth:50,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        require:true,
        minlength:3,
        maxlingth:50,
    },
    age:{
        type:Number,
        require:true,
        min:18,
        max:120,
        trim:true
    },
    password:{
        type:String,
        require:true,
        minlength:8,
        maxlingth:50,
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