const router = require('express').Router();
const { Post, User, Comment, Favorite } = require('../../models');

router.put('/favorite', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote(req.body, { Favorite })
      .then(updatedPostData => res.json(updatedPostData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });