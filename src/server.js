const Hapi = require('hapi');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const Blipp = require('blipp');
const config = require('../config');
const log = require('./logging');
const Pack = require('../package.json');
const route = require('./route');

const server = new Hapi.Server({
  debug: config.server.debug
});

server.connection({
  port: config.server.port
});

server.register([
  Blipp,
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: {
      info: {
        title: 'Hapijs Boilerplate Documentation',
        description: 'Hapijs Boilerplate Documentation',
        version: Pack.version,
      },
      schemes: ['http'],
      host: `${config.server.host}:${config.server.port}`
    }
  },
  {
    register: Good,
    options: {
      reporters: {
        consoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [
              {
                response: '*',
                log: '*'
              }
            ]
          },
          {
            module: 'good-console'
          }, 'stdout'],
        fileReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
          }, {
            module: 'good-squeeze',
            name: 'SafeJson'
          }, {
            module: 'good-file',
            args: [config.server.logs.filePath]
          }
        ]
      }
    }
  }
], (error) => {
  if (error) {
    throw error;
  }

  server.route(route);

  server.start((err) => {
    if (err) {
      log.error({ err }, 'Error occurred while starting server !!!');
    }
    log.info(`Server started at http://${config.server.host}:${config.server.port}`);
  });
});
