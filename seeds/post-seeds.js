const { Post } = require('../models');
const { belongsTo } = require('../models/User');

const postdata = [
    {
        title: 'THE belk-tech-blog',
        post_url: 'github.com/jamesbelk0/belk-tech-blog',
        user_id: '2'
    },
    {
        title: 'Dogs are Cool',
        post_url: 'https://dogs.com',
        user_id: '2'
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;