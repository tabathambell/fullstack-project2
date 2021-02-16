const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at']],
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

        res.render('homepage', {
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//single post
//serve up the single post page
router.get("/viewpost/:id", (req, res) => {
    //we need to get all posts
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    })
      .then((dbPostData) => {
        //serialize data
        if (!dbPostData) {
          res.status(404).json({ message: "No Posts Available" });
          return;
        }
        const post = dbPostData.get({ plain: true }); // serialize all the posts
        console.log(post);
        const myPost = post.user_id == req.session.user_id;
        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
          currentUser: myPost,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;