const log = require('./logging');

const route = [];

route.push({
  method: 'GET',
  path: '/hello',
  config: {
    tags: ['api'],
    description: 'Hello World',
    handler: (request, reply) => {
      log.info('Received request');
      reply('Hello Hapijs!');
    }
  }
});


module.exports = route;
