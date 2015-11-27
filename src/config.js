require('babel/polyfill');
const host = (process.env.DOCKER_HOST ? process.env.DOCKER_HOST.match(/([0-9]+\.)+([0-9]+)/g)[0] : 'localhost');

const environment = {
  development: {
    isProduction: false,
    host: 'localhost',
    rethinkdb: {
      host: host,
      port: process.env.DB_PORT
    }
  },
  production: {
    isProduction: true,
    host: host,
    rethinkdb: {
      host: process.env.WEBDB_PORT_28015_TCP_ADDR,
      port: process.env.WEBDB_PORT_28015_TCP_PORT
    }
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  secret: process.env.SECRET,
  rethinkdb: {
    db: process.env.DB_NAME,
    discovery: false
  },
  app: {
    title: 'WhatAShop',
    description: 'WhatAShop, an online shopping website.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'WhatAShop',
        'og:image': 'logo.png',
        'og:locale': 'en_US',
        'og:title': 'WhatAShop',
        'og:description': 'WhatAShop, an online shopping website.'
      }
    }
  }
}, environment);
