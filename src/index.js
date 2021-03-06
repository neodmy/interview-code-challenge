const http = require('http');

const loadEnvTest = require('./utils/loadEnvTest');
const logger = require('./utils/logger');
const initApp = require('./app');

const init = async () => {
  try {
    loadEnvTest();
    const app = initApp();
    const port = Number(process.env.PORT) || 3001;
    app.set('port', port);
    const server = http.createServer(app);
    server.setTimeout(5000);
    await server.listen(port);
    logger.info(`Server listening on port ${port}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

init();
