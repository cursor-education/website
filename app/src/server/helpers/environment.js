let path = require('path');

const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';

let getEnvironmentName = () => {
  return process.env.NODE_ENV;
};

let isProduction = () => getEnvironmentName() == ENV_PRODUCTION
let isDevelopment = () => getEnvironmentName() == ENV_DEVELOPMENT

module.exports = { isProduction, isDevelopment }
