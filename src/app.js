const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./utils/logger');
const initControllers = require('./controllers');
const routes = require('./routes');
const createError = require('./utils/errors');

module.exports = () => {
  logger.info('App init');

  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('src/public'));

  const controllers = initControllers();

  routes(app, controllers);

  app.use((req, res, next) => {
    next(createError(`${req.method} - ${req.path} not found`, 404));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
  });

  logger.info('App loaded');
  return app;
};
