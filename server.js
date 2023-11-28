// Node Module for 'Path'
const path = require('path');
// Dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Add custom routes from directory, e.g. const routes = require('./controllers');

const sequelize = require('./config/connection');
const routes = require('./controllers/api');
// If we need any helpers, declare them here and check path
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Create handlebars and add any helpers we need
const hbs = exphbs.create();
// const hbs = exphbs.create({ helpers }); with helpers defined above if needed

// Create and set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middle ware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Serve static files from public using path:
app.use(express.static(path.join(__dirname, 'public')));

// Use the custom routes required at the top
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
