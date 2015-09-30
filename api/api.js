require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import PrettyError from 'pretty-error';
import Thinky from 'thinky';

const thinky = new Thinky(config.rethinkdb);
const type = thinky.type;

const pretty = new PrettyError();
const app = express();

app.use(bodyParser.json());

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://localhost:%s', config.apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
