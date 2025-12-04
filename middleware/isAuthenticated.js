const jwt = require ("jsonwebtoken");
const {promisify} = require("util");
const User = require("../model/userModel");
const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
        return res.status(400).json({
            message:"please send token"
        })
        }
    const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY);
    const doesUserExist = await User.findOne({_id:decoded.id});

    if(!doesUserExist){
        return res.status(400).json({
            message: "User doesnot exist with that token/id"
        })
    }
    req.user = doesUserExist;
    next();
    }
    catch(error){
        res.status(400).json({
            message:error.message,
        })

    }
    
    // jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
    //     if(err){
    //         res.status(400).json({
    //             message:"Invalid token"
    //         })
    //     }else{
    //         res.status(200).json({
    //             message:"valid token"
    //         })
    //     }
    // })
    
}

module.exports = isAuthenticated;