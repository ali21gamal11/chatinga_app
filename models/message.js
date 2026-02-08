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
        ref:"User",
    },
    edited:{
        type:Boolean,
        default:false
    },
    deleted:{
        type:Boolean,
        default:false
    },
        deletedAt:{
        type:Date,
        default:null
    }
},{timestamps:true});

const Message = mongoose.model("Message",MessageSchema);

function validateNewMessage(obj){
    const schema = joi.object({
        content:joi.string().required().min(1).max(200),
        senderId:joi.string().required(),
        receiverId:joi.string().required(),
    })
    return schema.validate(obj);
}

function validateUpdateMessage(obj){
    const schema = joi.object({
        content:joi.string().min(1).max(200),
        edited:joi.boolean()
    })
    return schema.validate(obj);
}

function validateLikeDeleteMessage(obj){
    const schema = joi.object({
        deleted:joi.boolean(),
        deletedAt:joi.date()
    })
    return schema.validate(obj);
}

module.exports = {
    Message,validateNewMessage,validateUpdateMessage,validateLikeDeleteMessage
}