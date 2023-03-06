const { Router } = require('express');

const userRouter = require('./user');
const thoughtRouter = require('./thought');

const apiRouter = new Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/thoughts', thoughtRouter)

module.exports = apiRouter;