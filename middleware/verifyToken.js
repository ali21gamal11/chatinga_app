const jwt = require('jsonwebtoken');

// Virfy Token
function virfyToken(req,res,next){

    const token = req.headers.token;

    console.log("Headers:", req.headers);

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.SECKEY);
            req.user = decoded;
            next();
        }catch(error){
            return res.status(401).json({message:"invalid token",error:`${error}`});
        }
    }else{
        return res.status(401).json({message:"No Token"});
    }
}

// Virfy Token & Athorize the user
function verifyTokenTheAuthorize(req,res,next){
    virfyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"you are not allowed..(wtf you think your are)"})
        }
    })
}



//verify token & Authorize admins
function AuthorizeTheAdmin(req,res,next){
    virfyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"you are not an admin"})
        }
    })
}


module.exports = { verifyTokenTheAuthorize,virfyToken,AuthorizeTheAdmin };
