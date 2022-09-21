const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;
const helpers = require('./utils/helpers');
require('dotenv').config()



const routes = require('./routes')



const sess = {
  secret: 'super secret secrets',
  cookie: {
    maxAge: 1000*60*15,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore( {
    db: sequelize,
  })

}

app.use(session(sess));

const hbs = exphbs.create({ helpers });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(routes)


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}.`
    )
  );
});