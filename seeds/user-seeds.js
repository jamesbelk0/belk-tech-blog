const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: 'jamesbelk0',
        email: 'jamesbelk0@gmail.com',
        password: 'password'
    },
    {
        username: 'belkcrossfit',
        email: 'belkcrossfit@gmail.com',
        password: 'root1234'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;