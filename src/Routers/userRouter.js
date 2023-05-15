const express=require('express');
const userRouter=express.Router();
const {loginUser,signUpUser}=require('../Controllers/userController');

userRouter.post("/login", loginUser);
userRouter.post("/signup", signUpUser);
module.exports=userRouter;