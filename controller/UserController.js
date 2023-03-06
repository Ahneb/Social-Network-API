const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find().populate({
      path: 'thoughts', 
      select: '-__v',
    }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.status(500).json(err);
    });
  },
  
  getSingleUser(req, res) {
    User.findOne(
      { 
        _id: req.params.userId,
      },
    ).populate(
      { 
        path: 'thoughts', 
        select: '-__v' 
      }).then((user) =>{
        if (!user) {
          res.status(404).json({ message: 'Invalid User' });
        } else {
          res.json(user);
        };
      }).catch((err) => {
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      }).catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ 
      _id: req.params.userId 
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Invalid User' });
      } else {
        Thought.deleteMany({ _id: { $in: user.thoughts } });
      };
    }).then(() => {
      res.json({ message: 'Deleted User and Thoughts' });
    }).catch((err) => {
      res.status(500).json(err);
    });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId }, 
        req.body, 
        { new: true },
      ).then((user) => {
        res.json(user);
      }).catch((err) => {
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $push: {friends: req.params.friendId} }, 
      { new: true },
      ).then((user) => {
        res.json(user);
      }).catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteFriend(req, res) {
    User.updateOne(
      { _id: req.params.userId }, 
      { $pull: { friends: req.params.friendId } }, 
      { new: true },
      ).then(() => {
        res.json({ message: 'Deleted Friend' });
      }).catch((err) => {
        res.status(500).json(err);
      });
  },
};