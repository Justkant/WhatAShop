import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from '../src/config';
import { users, products } from './functions';
import PrettyError from 'pretty-error';
import multer from 'multer';
import mimetypes from 'mimetypes';

const pretty = new PrettyError();
var storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mimetypes.detectExtension(file.mimetype));
  }
});
const upload = multer({ storage: storage });
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

const staticOptions = {};
if (config.isProduction) {
  staticOptions.maxAge = '60 days';
}
app.use('/uploads', express.static('uploads/', staticOptions));

app.get('/load', users.load);
app.post('/login', users.login);
app.get('/logout', users.logout);

app.route('/users')
  .get(users.auth, users.isAdmin, users.getUsers)
  .post(users.addUser);

app.route('/users/:id')
  .get(users.auth, users.getUser)
  .put(users.auth, users.isOwner, users.updateUser)
  .delete(users.auth, users.isOwner, users.deleteUser);

app.route('/users/:id/cart')
  .get(users.auth, users.isOwner, users.getUserCart)
  .post(users.auth, users.isOwner, users.addUserProduct)
  .delete(users.auth, users.isOwner, users.deleteUserCart);

app.route('/users/:id/cart/:cartId')
  .get(users.auth, users.isOwner, users.getUserCartItem)
  .put(users.auth, users.isOwner, users.updateCartItem)
  .delete(users.auth, users.isOwner, users.deleteCartItem);

app.route('/users/:id/orders')
  .get(users.auth, users.isOwner, users.getUserOrders)
  .post(users.auth, users.isOwner, users.validateCart, users.load);

app.route('/users/:id/orders/:orderId')
  .get(users.auth, users.isOwner, users.getUserOrder)
  .put(users.auth, users.isAdmin, users.updateOrder)
  .delete(users.auth, users.isAdmin, users.deleteOrder);

app.route('/products')
  .get(users.auth, users.isAdmin, products.getProducts)
  .post(users.auth, users.isAdmin, products.addProduct);

app.route('/products/:id')
  .get(users.auth, products.getProduct)
  .put(users.auth, users.isAdmin, products.updateProduct)
  .delete(users.auth, users.isAdmin, products.deleteProduct);

app.get('/market', users.auth, products.getMarket);

app.get('/search/:text', users.auth, products.search);

app.post('/picture', users.auth, upload.single('picture'), (req, res) => {
  res.json({url: req.file.path});
});

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s ', config.host, config.apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
