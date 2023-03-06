const { Router } = require('express');

const UserController = require('../../controller/UserController');

const userRouter = new Router();


userRouter.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

userRouter.route('/:userId')
  .get(UserController.getSingleUser)
  .delete(UserController.deleteUser)
  .put(UserController.updateUser);

userRouter.route('/:userId/friends/:friendId')
  .post(UserController.addFriend)
  .delete(UserController.deleteFriend);

module.exports = userRouter;