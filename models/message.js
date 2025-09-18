const mongoose = require('mongoose');
const joi = require('joi');

const MessageSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
        minlength:1,
        maxlength:200,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    edited:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Message = mongoose.model("Message",MessageSchema);

function validateNewMessage(obj){
    const schema = {
        contant:joi.string().required().min(1).max(200),
        senderId:joi.string().required(),
        receiverId:joi.string().required(),
    }
    return schema.validate(obj);
}

function validateUpdateMessage(obj){
    const schema = {
        contant:joi.string().min(1).max(200),
    }
    return schema.validate(obj);
}

module.exports = {
    Message,validateNewMessage,validateUpdateMessage
}