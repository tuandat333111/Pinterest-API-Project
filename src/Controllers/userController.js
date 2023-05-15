const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/jwt');
const { successCode,errorCode,failCode } = require('../Utils/response');
  
const loginUser = async (req, res) => {    
    let { email, pass_word } = req.body;
    let checkUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    console.log(checkUser);
    // check login 
    if (checkUser) {
        let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
        if (checkPass == true) {

            let token = generateToken(checkUser);
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

// const signUpUser = async (req, res) => {
//     try {
//         let { full_name, email, pass_word, age } = req.body;
        
//         let newData = {
//             full_name,
//             email,
//             pass_word: bcrypt.hashSync(pass_word, 10),
//             age,
            
//         }
        
//         let checkEmail = await prisma.user.findFirst({
//             where: {
//                 email
//             }
//         })

//         if (checkEmail) {
//             failCode(res, "Email already existed", "");
//             return;
//         }       
//         await prisma.user.create(newData);        
//         successCode(res, "Sign up successfully", "");

//     } catch (err) {        
//         errorCode(res, "BE error");

//     }
// }  
module.exports={
    loginUser,
    signUpUser,
}