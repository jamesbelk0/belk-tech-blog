const router = require("express").Router();
const sequqlize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    Post.findall({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_comment',
            'title',
            'created_at'],
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
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router
