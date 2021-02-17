const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment , Favorite } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at']],
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'city',
            'country',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(dbPostData);
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'city',
            'country',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        console.log(post);

        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;