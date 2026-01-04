const User = require("./model/userModel")
const bcrpyt = require("bcryptjs");
const adminSeeder = async() =>{
    const isAdminExist = await User.findOne({userEmail:"admin@gmail.com"});
    if(!isAdminExist){
        await User.create({
            userEmail:"admin@gmail.com",
            userPassword:bcrpyt.hashSync("admin",10),
            userPhoneNumber:9876543210,
            userName:"admin",
            role:"admin",
        });

        console.log("Admin seeded successfully");
    }else{
        console.log("Admin already exists");
    }
}

module.exports = adminSeeder; 