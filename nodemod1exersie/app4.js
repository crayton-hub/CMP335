const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();
logger.log('message');

//register a listerner 
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});
