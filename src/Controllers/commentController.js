const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode,errorCode,failCode } = require('../Utils/response');

const getCommentByImageId=async(req,res)=>{
    try{
        let {image_id}=req.body;
        let data=await prisma.comment.findFirst({
            where:{
                image_id:parseInt(image_id)
            }
        })
        successCode(res,"Get comment successfully",data);
    }
    catch{
        errorCode(res,"BE error","")
    }
}
const commentByImageId=async(req,res)=>{
    try{        
        let {image_id,user_id,comment_content}=req.body;
        let data={
            user_id,
            image_id:parseInt(image_id),
            comment_content
        };
        await prisma.comment.create({data});
        successCode(res,"Comment successfully",data);
    }
    catch{
        errorCode(res,"BE error","")
    }
}
module.exports={
    getCommentByImageId,
    commentByImageId,
}