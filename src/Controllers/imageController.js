const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode,errorCode,failCode } = require('../Utils/response');

const getImageList=async (req,res)=>{
    try{
        let data=await prisma.image.findMany();
        successCode(res,"Get the list successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
   
}

const getImageListByName=async (req,res)=>{
    try{
        let {keyword}=req.body;
        let data=await prisma.image.findMany({
            where:{
                image_name:{
                    contains: keyword
                }
            }
        });
        successCode(res,"Get list by name successfully",data)
    }
    catch{
        errorCode(res,"BE error","");
    }
    
}
const getImageByUserId=async(req,res)=>{
    try{
        let {user_id}=req.body;
        let data=await prisma.image.findMany({
            where:{
                user_id:parseInt(user_id)
            }
        })
        successCode(res,"Get the list successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const getImageSavedByUserId=async(req,res)=>{
    try{
        let {user_id}=req.body;
        let data=await prisma.save.findMany({
            where:{
                user_id:parseInt(user_id)
            }
        })
        successCode(res,"Get the list successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const getImageCreatorInfoByImageId=async(req,res)=>{
    try{
        let {image_id}=req.body;
        let data=await prisma.image.findFirst({
            include:{
                user:{
                    select:{
                        email:true,
                        full_name:true,
                        age:true,
                        avatar:true
                    }                    
                }
            },
            where:{
                image_id:parseInt(image_id)
            }
        })
        successCode(res,"Get detailed image successfully",data);
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const addImage=async(req,res)=>{
    try{
        let file=req.file;
        let{image_name,description,user_id}=req.body;  
        let path=`${process.cwd()}/public/Images/${file.filename}`;      
        let data={
            image_name,
            path,
            description,
            user_id            
        }
        await prisma.image.create({data});
        successCode(res,"Add image successfully",data)
    }
    catch{
        errorCode(res,"BE error","");
    }
}
const deleteImage=async(req,res)=>{
    try{
        let{image_id,user_id}=req.body;        
        const data=await prisma.image.findFirst({
            where:{
                image_id
            }
        })
        if(data.user_id===user_id){
            await prisma.image.delete({where:{image_id}});
            successCode(res,"Delete image successfully",data)
        }        
    }
    catch{
        errorCode(res,"BE error","");
    }
}
module.exports={
    getImageList,
    getImageListByName,
    addImage,
    deleteImage,
    getImageByUserId,
    getImageSavedByUserId,
    getImageCreatorInfoByImageId,

}