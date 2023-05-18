const express=require('express');
const saveRouter=express.Router();
const {getSaveByImageId,saveImageByUserId}=require('../Controllers/saveController');
const {privateAPI}=require('../Utils/jwt');

saveRouter.get("/get-save-by-image-id",privateAPI,getSaveByImageId);
saveRouter.post("/save-image-user-id",privateAPI,saveImageByUserId);

module.exports=saveRouter;