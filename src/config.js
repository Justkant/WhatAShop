require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  secret: process.env.SECRET,
  rethinkdb: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME
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
