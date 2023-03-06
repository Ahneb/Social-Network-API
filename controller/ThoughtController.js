const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((data) => {
        res.json(data)
      }).catch((err) => {
        res.status(500).json(err)
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((data) =>{
        if(data) {
          res.json(data)
        } else {
          res.status(404).json({ message: 'No thought with that ID' })
        };
      }).catch((err) => {
        res.status(500).json(err)
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: data._id } },
          { new: true },
        );
      }).then((user) => {
        if (!user){
          res.status(404).json( { message: 'Invalid User' } );
        } else {
          res.json('Created Thought');
        }
      }).catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
    ).then(() => {
      res.json( { message: 'Deleted Thought' } );
    }).catch((err) => {
      res.status(500).json(err);
    });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { 
        _id: req.params.thoughtId,
      }, 
      req.body, 
      { 
        new: true,
      }).then((user) => {
        res.json(user);
      }).catch((err) => {
        res.status(500).json(err)
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { 
        _id: req.params.thoughtId,
      }, 
      { 
        $addToSet: { 
          reactions: req.body
        } 
      }, 
      { 
        new: true, 
      }).then((data) =>{
        if (!data) {
          res.status(404).json( { message: 'Invalid Thought' } );
        } else {
          res.json(data);
        };
      }).catch((err) => {
        res.status(500).json(err);
      });
  },
  
  deleteReaction(req, res) {
    console.log(req.params.thoughtId, req.params.reactionId)
    Thought.updateOne(
      { 
        _id: req.params.thoughtId,
      }, 
      { 
        $pull: { 
          reactions: { 
            _id: req.params.reactionId,
          },
        },
      }, 
      { 
        new: true,
      }).then(() => {
        res.json({ message: 'reaction deleted!' });
      }).catch((err) => {
        res.status(500).json(err);
      });
  }
};