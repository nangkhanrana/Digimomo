const User = require("../../../../model/userModel");

exports.getMyProfile = async (req,res)=>{
    const userId = req.user.id;
    const myProfile = await User.findById(userId);

    res.status(200).json({
        data: myProfile,
        message:" Profile created successfully"
    });
}