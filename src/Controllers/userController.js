const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { successCode,errorCode,failCode } = require('../Utils/response');


const getUserInfo=async (req,res)=>{
    try{
        let data=await prisma.user.findMany();
        successCode(res,"Get the list successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
   
}

const modifyUserInfo=async(req,res)=>{
    try{
        let {user_id,pass_word,full_name,age,avatar}=req.body;
        let data={
            pass_word: bcrypt.hashSync(pass_word, 10),
            full_name,
            age,
            avatar
        }       
        console.log(data);             
        await prisma.user.update({data,where:{user_id:parseInt(user_id)}});
        successCode(res,"Modify profile successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const getImageSavedByUser=async(req,res)=>{
    try{
        let {user_id}=req.body;
        let data=await prisma.save.findMany({
            include:{
                image:true
            },
            where:{
                user_id
            }
            
        })
        successCode(res,"Get saved list by user successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const uploadAvatarUser=async(req,res)=>{
    try{
        let {user_id}=req.params;
        let file = req.file;
        let avatar=`${process.cwd()}/public/Images/${file.filename}`;
        let data={
            avatar
        }
        await prisma.user.update({data,where:{user_id:parseInt(user_id)}});
        successCode(res,"Update avatar successfully",data);        
    }
    catch{
        errorCode(res,"BE error","");
    }
} 
   


module.exports={
    getUserInfo,
    modifyUserInfo,
    getImageSavedByUser,
    uploadAvatarUser,

}