const { config } = require('dotenv');

module.exports = () => {
  if (process.env.DEV === '1') config();
};
