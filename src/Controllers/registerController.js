const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { successCode,errorCode,failCode } = require('../Utils/response');
  
const signUpUser = async (req, res) => {
    try {
        let { full_name, email, pass_word, age } = req.body;
        
        let data = {
            full_name,
            email,
            pass_word: bcrypt.hashSync(pass_word, 10),
            age,            
        }
        
        let checkEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (checkEmail) {
            failCode(res, "Email already existed", "");
            return;
        }     
        await prisma.user.create({data});
              
        successCode(res, "Sign up successfully", data);

    } catch (err) {        
        errorCode(res, "BE error");

    }
}  
module.exports={
    signUpUser,
}