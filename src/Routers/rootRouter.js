const express = require('express');
// const imageRouter = require('./imageRouter');
const userRouter=require('./userRouter');
// const commentRouter=require('./commentRouter');
// const saveRouter=require('./saveRouter');
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
// rootRouter.use("/image",imageRouter);
// rootRouter.use("/comment",commentRouter);
// rootRouter.use("/save",saveRouter);
module.exports = rootRouter;