const logger = require('../utils/logger');
const initStores = require('../stores');
const phones = require('./phonesController');

module.exports = () => {
  logger.info('Controller init');
  const stores = initStores();
  const phonesController = phones(stores.phonesStore);
  logger.info('Controller loaded');
  return {
    phonesController,
  };
};
