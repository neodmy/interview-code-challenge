const { MongoClient } = require('mongodb');

const logger = require('../utils/logger');
const phones = require('./phonesStore');

const mongoHost = process.env.MONGOHOST;
const mongoPort = process.env.MONGOPORT;
const mongoUrl = `mongodb://${mongoHost}:${mongoPort}`;

const connectMongo = async ({ db, col }) => {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const database = client.db(db);
  const collection = database.collection(col);
  return {
    client,
    collection,
  };
};

module.exports = () => {
  logger.info('Store init');
  const phonesStore = phones(connectMongo);
  logger.info('Store loaded');
  return {
    phonesStore,
  };
};
