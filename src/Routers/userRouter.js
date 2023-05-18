const express=require('express');
const userRouter=express.Router();
const {getUserInfo,modifyUserInfo,getImageSavedByUser,uploadAvatarUser}=require('../Controllers/userController');
const {privateAPI}=require('../Utils/jwt');
const {uploadAvatar} = require('../Utils/upload');

userRouter.get("/get-user-info",privateAPI,getUserInfo);
userRouter.get("/get-saved-image-by-user",privateAPI,getImageSavedByUser);
userRouter.put("/modify-user-info",privateAPI,modifyUserInfo);
userRouter.put("/upload-avatar/:user_id",uploadAvatar.single("avatar"), uploadAvatarUser);
module.exports=userRouter;