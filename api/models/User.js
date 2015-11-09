import thinky from '../utils/thinky';
import Cart from './Cart';
import Order from './Order';
const type = thinky.type;

const User = thinky.createModel('User', {
  id: type.string(),
  username: type.string().required(),
  email: type.string().email().required(),
  password: type.string().required(),
  admin: type.boolean().default(true),
  createdAt: type.date().default(thinky.r.now()),
  token: type.string(),
  pictureUrl: type.string(),
  cartTotal: type.number().default(0)
});

User.define('getPublic', function() {
  delete this.password;
  return this;
});

User.hasMany(Cart, 'cart', 'id', 'userId');
Cart.belongsTo(User, 'user', 'userId', 'id');
User.hasMany(Order, 'orders', 'id', 'userId');
Order.belongsTo(User, 'user', 'userId', 'id');

export default User;
