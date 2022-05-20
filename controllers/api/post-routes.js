const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// All Posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'text', 'created_at'],
        order: [['created_at', 'DESC']],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text', 'created_at'],
        order: [['created_at', 'DESC']],
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
        if(!dbPostData){
            res.status(404).json({message: "No posts found with this id"});
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a Post
router.post('/', (req, res) => {
    Post.create({
      title: req.body.title,
      post_comment: req.body.post_comment,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', (req, res) => {
      Post.update(
          {
              title: req.body.title,
              post_comment: req.body.post_comment
          },
          {
              where: {
                  id: req.params.id
              }
          }
      )
      .then(dbPostData => {
          if(!dbPostData) {
              res.status(404).json({ message: "No posts found with this id"});
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  // Destroy a Post
  router.delete('/:id', (req, res) => {
      Post.destroy({
          where: {
              id: req.params.id
          }
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: "No posts found with this id"});
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  module.exports = router;