const { createLogger, format, transports } = require('winston');

const customFormat = format.printf(({ timestamp, level, message }) => `[${timestamp}][${level}] ${message}`);

const logger = createLogger({
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.timestamp(),
    customFormat,
  ),
});

module.exports = logger;
