// Load config
const config = require('./config');

// Init Telegram bot 
const bot = require('./bot')(config);

// Start server
const server = require('./server')(bot);

// Start queue processors
require('./queue').start();

// Handle exit 
process.on('SIGINT', () => {
  server.close();
  process.exit();
});

// Start server
server.listen(3000, () => {
  console.log('Server started on port 3000'); 
});
