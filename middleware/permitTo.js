const permitTo = (...roles) =>{
    return (req, res, next) =>{
        const userRole = req.user.role;
        if(!roles.includes(userRole)){
            res.status(400).json({
                message:"you dont have permission for this"
            })
        }
        else{
            next();
        }
    }
}

module.exports = permitTo;