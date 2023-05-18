const express=require('express');
const imageRouter=express.Router();
const {getImageList,getImageListByName,addImage,deleteImage,getImageByUserId,getImageSavedByUserId,getImageCreatorInfoByImageId}=require('../Controllers/imageController');
const {privateAPI}=require('../Utils/jwt');
const {uploadImage}=require('../Utils/upload')
imageRouter.get("/get-image-list",privateAPI,getImageList);
imageRouter.get("/get-image-list-by-name",privateAPI, getImageListByName)
imageRouter.get("/get-image-list-by-user-id",privateAPI, getImageByUserId)
imageRouter.get("/get-image-list-saved-by-user-id",privateAPI, getImageSavedByUserId)
imageRouter.get("/get-image-creator-info-by-image-id/:image_id",privateAPI, getImageCreatorInfoByImageId)
imageRouter.post("/add-image",privateAPI,uploadImage.single("image"),addImage)
imageRouter.delete("/delete-image",privateAPI,deleteImage)
module.exports=imageRouter;