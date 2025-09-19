const bcrypt = require('bcrypt');
const {Message,validateNewMessage,validateUpdateMessage,validateLikeDeleteMessage} = require('../models/message');

const getAllMessages = async(req,res)=>{
    try{
        const message = await Message.find();
        res.status(200).json(message);
    }catch(err){res.status(500).json({message:`${err}`})}
}

const createNewMessage = async(req,res)=>{
    const { error } = validateNewMessage(req.body)
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    try{

        const message = new Message({
            content:req.body.content,senderId:req.body.senderId,receiverId:req.body.receiverId
        })
        const result = await message.save();
        res.status(201).json(result);


    }catch(err){ res.status(500).json({err:`${err}`})}
}

const getMessageById = async (req,res)=>{
    try{
        const messageId = req.params.id
        const message = await Message.findById(messageId);

        if(message){
            res.status(200).json(message);
        }else{
            res.status(404).json({message:'message not found'});
        }
    }catch(err){res.status(400).json({message:`somthing went erong in DataBase, error=>:${err}`})}

}

const updateMessage = async (req,res)=>{
    const { error } = validateUpdateMessage(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }

    const message = await Message.findById(req.params.id);
    if(!message){
        return res.status(404).json({message:'message not found'});
    }

    try{

        const messageUpdate = await Message.findByIdAndUpdate(req.params.id,{$set:{
            content:req.body.content,
            edited:true
        }},{new:true})
        res.status(200).json(messageUpdate);
    }catch(err){
        return res.status(500).json({error:`${err}`});
    }
}

const likeDeletMessage = async (req,res)=>{
    const { error } = validateLikeDeleteMessage(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }

    const message = await Message.findById(req.params.id);
    if(!message){
        return res.status(404).json({message:'message not found'});
    }

    try{

        const messageUpdate = await Message.findByIdAndUpdate(req.params.id,{$set:{
            deleted:true,
            deletedAt:new Date()
        }},{new:true})
        res.status(200).json(messageUpdate);
    }catch(err){
        return res.status(500).json({error:`${err}`});
    }
}


const deleteMessage = async(req,res)=>{
    try{
        const message = await Message.findById(req.params.id);
        if(message){
            await Message.findByIdAndDelete(req.params.id);
            res.status(200).json({message:`message :(' ${message.content} ') has been deleted`})
        }else{
            return res.status(404).json({message:'message not found'});
        }

    }
    catch(err){ 
        res.status(400).json({message:"somthing went wrong",error:`${error}`});
    }
}

module.exports = {
    updateMessage,deleteMessage,createNewMessage,getAllMessages,getMessageById,likeDeletMessage
}
