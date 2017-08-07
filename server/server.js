import express from 'express';
import passport from 'passport';
// import passportLocal from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import session from 'express-session';
//
import config from './config';
// import apiRouter from './api/routes';

const server = express();
const path = require('path');

// const LocalStrategy = passportLocal.Strategy;
server.use(cookieParser());
server.use(bodyParser.json());
/*
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = storage.team.members.find(item => (item === username));
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  },
));
*/
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

server.use(session({
  secret: ',DBj2%*N;Q"?(T9{mS{EVWvZ2G3,3BG$I)n,?mZ_3@0*?pwT2,lh@SC"jocVdbs',
  cookie: { maxAge: 6000 * 1000 },
  resave: true,
  saveUninitialized: false,
  name: 'caltcha-sid',
}));
server.use(passport.initialize());
server.use(passport.session());

if (process.env.NODE_ENV === 'dev') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackDevConfig = require('../webpack.dev.config.js');
  const compiler = webpack(webpackDevConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: { colors: true },
  });
  server.use(middleware);
  server.use(webpackHotMiddleware(compiler));
  server.use('/api', require('./api/routes'));
  server.use('/', require('./auth.js'));
  server.get('/', (req, res) => {
    if (typeof req.user !== 'undefined') {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
      res.redirect('/login');
    }
  });
} else {
  server.use(express.static('public'));
  server.use('/api', require('./api/routes'));
  server.use('/', require('./auth'));
  server.get('/', (req, res) => {
    if (typeof req.user !== 'undefined') {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
      res.redirect('/login');
    }
  });
}

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/caltcha');
}

server.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  next();
});

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
  console.log(process.env.NODE_ENV);
});
