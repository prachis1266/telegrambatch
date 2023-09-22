const chalk = require('chalk');

// Log with timestamp
function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

// Log error
function error(msg) {
  console.error(chalk.red(`[${new Date().toISOString()}] ${msg}`));
} 

// Log success 
function success(msg) {
  console.log(chalk.green(`[${new Date().toISOString()}] ${msg}`));
}

module.exports = {
  log,
  error,
  success
};
