const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequalizeStore = require('connection-session-sequalize')(session.Store);
const helpers = reqiore('./utilis/herlpers');
const hbs = exphbs.create({helpers});

const sess = {
    secret: 'Super duper secret',
    cookie: {},
    resave: false,
    saveUninitizlized: true,
    store: new SequelizeStore({
        db: sequalize
    })
};

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});