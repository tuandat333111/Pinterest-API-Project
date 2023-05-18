const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { generateToken, checkToken } = require('../Utils/jwt');
const { successCode,failCode } = require('../Utils/response');
  
const loginUser = async (req, res) => {    
    let { email, pass_word } = req.body;
    let checkUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    
    // check login 
    if (checkUser) {
        let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
        if (checkPass == true) {
            let newData={
                email:checkUser.email,
                pass_word:checkUser.pass_word,
                full_name:checkUser.full_name,
                age:checkUser.age
            }
            let token = generateToken(newData);
            let data={
                accessToken:token,
                email:checkUser.email,
                full_name:checkUser.full_name,
                age:checkUser.age

            }
            successCode(res, "Login success", data);
        } 
        else {
            failCode(res, "Password is wrong!", "");
        }       
    } 
    else {        
        failCode(res, "Email is not existed!", "");
    }
}

 
module.exports={
    loginUser,
}