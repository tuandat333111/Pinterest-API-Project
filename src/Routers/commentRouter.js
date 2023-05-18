const express=require('express');
const commentRouter=express.Router();
const {getCommentByImageId,commentByImageId}=require('../Controllers/commentController');
const {privateAPI}=require('../Utils/jwt');

commentRouter.get("/get-comment-by-image-id/:image_id",privateAPI,getCommentByImageId);
commentRouter.post("/comment-by-image-id/:image_id",privateAPI,commentByImageId);
module.exports=commentRouter;