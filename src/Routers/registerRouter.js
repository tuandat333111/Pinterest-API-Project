const express=require('express');
const registerRouter=express.Router();
const {signUpUser}=require('../Controllers/registerController');

registerRouter.post("/register", signUpUser);
module.exports=registerRouter;