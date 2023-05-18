const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode,errorCode,failCode } = require('../Utils/response');

const getSaveByImageId=async(req,res)=>{
    try{
        let {image_id,user_id}=req.body;
       
        let data=await prisma.save.findFirst({
            where:{
                image_id,
                user_id
            }
        });
        successCode(res,"This image was saved by user",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const saveImageByUserId=async(req,res)=>{
    try{
        let {image_id,user_id}=req.body;
        let checkData=await prisma.save.findFirst({
            where:{
                image_id,
                user_id
            }
        });
        if(checkData){
            failCode(res,"Image was saved by this user","");
        }
        let data={
            image_id,
            user_id
        }
        await prisma.save.create({data});
        successCode(res,"Save image successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
module.exports={
    getSaveByImageId,
    saveImageByUserId,
}