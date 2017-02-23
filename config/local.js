const path = require('path');

const logPath = path.join(__dirname, '../logs');

function createLogFilePath(filename) {
  return path.join(logPath, filename);
}

module.exports = {
  name: 'Hapijs Boilerplate',
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    debug: {
      log: ['error'],
      request: ['error']
    },
    logs: {
      filePath: createLogFilePath('cms-microservice-server.log')
    }
  },
  logs: {
    loggerName: 'cms-microservice',
    folder: logPath,
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'error',
        stream: process.stderr // logger INFO and above to stdout
      },
      {
        type: 'rotating-file',
        path: createLogFilePath('cms-microservice.log'),
        period: '1w',   // daily rotation
        count: 10// keep 10 back copies
      }
    ]
  },
  contentful: {
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    helpDocsSpaceId: process.env.CONTENTFUL_HELPDOCS_SPACE_ID
  }
};
