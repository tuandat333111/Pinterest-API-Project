const express = require('express');
const imageRouter = require('./imageRouter');
const loginRouter=require('./loginRouter');
const registerUser=require('./registerRouter');
const userRouter=require('./userRouter');
const commentRouter=require('./commentRouter');
const saveRouter=require('./saveRouter');
const rootRouter = express.Router();

rootRouter.use("/auth", loginRouter);
rootRouter.use("/sign-up", registerUser);
rootRouter.use("/image",imageRouter);
rootRouter.use("/user",userRouter);
rootRouter.use("/comment",commentRouter);
rootRouter.use("/save",saveRouter);
module.exports = rootRouter;