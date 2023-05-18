const express=require('express');
const loginRouter=express.Router();
const {loginUser}=require('../Controllers/loginController');

loginRouter.post("/login", loginUser);
module.exports=loginRouter;