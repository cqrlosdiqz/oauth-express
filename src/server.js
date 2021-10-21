const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const session = require('cookie-session');
const passport = require('passport');
const flash = require('express-flash');

const app = express();
require('./config/db');

//Setting
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000,
    name: 'session',
    resave: true,
    keys: [process.env.SESSION_SECRET || 'express-auth-cookie'],
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use('/', require('./routes'));

//Static files
app.use(express.static(path.join(__dirname, '../public')));

//Listen
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
