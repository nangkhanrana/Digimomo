const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    userPassword: {
        type: String,
        required: [true, "Password is required"],
    },  
    userName: {
        type:String,
        required: [true, "Name is required"],
    },
    userPhoneNumber: {
        type:Number,
        required:[true,"Phone number is required"],
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer",
    },
    otp:{
        type:Number,
    },
    isOtpVerified:{
        type:Boolean,
        default:false,
    },
    cart:[{ type: Schema.Types.ObjectId, ref: "Product"}],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;