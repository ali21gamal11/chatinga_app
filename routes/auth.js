const express  = require('express');
const router = express.Router();
const { User,validateLogin,validateNewUser } = require("../models/User");
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

/**
 * @desc registere a new user
 * @route api/auth/registere
 * @method POST
 * @access public
*/
router.post("/register",asyncHandler(async (req,res)=>{

    const { error } = validateNewUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({message:"this user alredy registered"});
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
    
    user = new User({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        password:req.body.password,
    })

    const result = await user.save();
    const token = jwt.sign({id:user._id,name:user.name,},process.env.SECKEY);
    const { password , ...other } = result._doc;
    res.status(201).json({...other,token});

}))


/**
 * @desc login user
 * @route api/auth/login
 * @method POST
 * @access public
*/
router.post("/login",asyncHandler(async(req,res)=>{
    const { error } = validateLogin(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].error});
    }

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:"Invalid User or Password"});
    }

    const truePassword = await bcrypt.compare(req.body.password,user.password);
    if(!truePassword){
        return res.status(400).json({message:"Invalid User or Password"});
    }

    const token = jwt.sign({id:user._id,name:user.name},process.env.SECKEY);
    const { password , ...other } = user._doc;
    res.status(201).json({...other,token});

}));

module.exports = router;