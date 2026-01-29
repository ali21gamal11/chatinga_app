const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const {User,validateNewUser,validateLogin,validateUpdateUser} = require('../models/User');

const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){res.status(500).json({message:`${err}`})}
}

const createNewUSer = async(req,res)=>{
    const { error } = validateNewUser(req.body)
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    const email = await User.findOne({email:req.body.email})
    if(email){ return res.status(400).json({message:`email ${email.email} is alredy registered`})}

    try{
        const salt = await bcrypt.genSalt(10);
        
        const hashed = await bcrypt.hash(req.body.password,salt)
        const user = new User({
            name:req.body.name,email:req.body.email,age:parseInt(req.body.age),password:hashed,
        })
        const result = await user.save();
        res.status(201).json(result);


    }catch(err){ res.status(500).json({err:`${err}`})}
}

const getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");;
        if(!user){
            return res.status(404).json({message:'user not found'});
        }

        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message:'user not found'});
        }
    }catch(err){res.status(400).json({message:`somthing went erong in DataBase, error=>:${err}`})}

}

const updateUser = async (req,res)=>{

    const { error } = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({error:message.details[0].message});
    }

    try{

        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:'user not found'});
        }

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }

        const userUpdate = await User.findByIdAndUpdate(req.params.id,{$set:{
            name:req.body.name,
            age:parseInt(req.body.age),
            email:req.body.email,
            password:req.body.password
        }},{new:true})
        res.status(200).json(userUpdate);
    }catch(err){
        return res.status(500).json({error:`${err}`});
    }
}

const deleteUser = async(req,res)=>{

    
    try{

        const user = await User.findById(req.params.id);
        if(user){
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message:`user ${user.name} has been deleted`})
        }else{
            return res.status(404).json({message:'user not found'});
        }
    }
    catch(error){ 
        res.status(400).json({message:"somthing went wrong",error:`${error}`});
    }
}

const updatebanList = async(req,res)=>{
    try{
        const userId = req.body.userId
        console.log("وصل يا زميكس",userId);
        return res.status(200).json({message:"وصلت ل اند بوينت بتاع البان  "})
    }catch(error){
        console.log("في خطاء ميطلعش منك",error)
    }
}

module.exports = {
    updateUser,deleteUser,createNewUSer,getAllUsers,getUserById,updatebanList
}
