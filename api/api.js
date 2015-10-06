require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import users from './users';
import products from './products';
import PrettyError from 'pretty-error';
import Thinky from 'thinky';

const thinky = new Thinky(config.rethinkdb);
const type = thinky.type;

const pretty = new PrettyError();
const app = express();

app.use(bodyParser.json());

app.get('/login', users.login);

app.route('/users')
  .get(users.getUsers)
  .post(users.addUser);

app.route('/users/:id')
  .get(users.getUser)
  .put(users.updateUser)
  .delete(users.deleteUser);

app.route('/products')
  .get(products.getProducts)
  .post(products.addProduct);

app.route('/products/:id')
  .get(products.getProduct)
  .put(products.updateProduct)
  .delete(products.deleteProduct);

app.get('/search/:text', products.search);

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
