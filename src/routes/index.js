const logger = require('../utils/logger');
const phonesRoutes = require('./phonesRoutes');

module.exports = (app, controllers) => {
  logger.info('Routes init');
  app.use('/phones', phonesRoutes(controllers.phonesController));
  logger.info('Routes loaded');
};
