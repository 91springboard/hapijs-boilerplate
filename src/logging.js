const Bunyan = require('bunyan');
const config = require('../config');

/**
 * Create a logger singleton instance
 */
const log = Bunyan.createLogger({
  name: config.logs.loggerName,
  streams: config.logs.streams
});

/**
 * Exports
 */
module.exports = log;
