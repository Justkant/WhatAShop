<div align="center">
  <h1>WhatAShop</h1>
  <a href="https://travis-ci.org/Justkant/WhatAShop">
    <img alt="Build Status" src="https://travis-ci.org/Justkant/WhatAShop.svg">
  </a>
  <a href="https://david-dm.org/Justkant/WhatAShop">
    <img alt="Dependency Status" src="https://david-dm.org/Justkant/WhatAShop.svg">
  </a>
  <a href="https://david-dm.org/Justkant/WhatAShop#info=devDependencies">
    <img alt="devDependency Status" src="https://david-dm.org/Justkant/WhatAShop/dev-status.svg">
  </a>
  <a href="https://raw.githubusercontent.com/Justkant/WhatAShop/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
</div>

# Install docker toolbox
You can find a setup [here](https://www.docker.com/docker-toolbox).

After the installation, open the docker Quickstart Terminal.

# Start the Production

### With npm installed
- ```npm run compose```

### With docker alone
- ```docker-compose build && docker-compose up```

# To get the API documentation
- Clone the repository
- ```npm install```
- ```npm run doc```
- Open ```doc/index.html```

# Steps to start development

## Start the db
### With Docker installed
- **The first time you create the db**, use ```npm run create-data``` to persist the data of the db
- ```npm run start-db &``` using a docker Quickstart Terminal

### With RethinkDB locally
- In a standard terminal start ```rethinkdb```

## Start the development
- ```npm run dev```

## Stop the db with Docker
- ```npm run stop-db```

# Preferred IDE:
- Atom
- WebStorm 11
- SublimeText
