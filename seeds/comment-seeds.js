const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'This is top QUAL-A-TY',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'I like random posts for fun',
        user_id: 2,
        post_id: 1,
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;