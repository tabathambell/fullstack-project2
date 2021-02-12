const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
    })
})

router.get('/edit/:id', (req, res) => {
    Post.findOne({
    })
})

module.exports = router;