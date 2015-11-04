import thinky from '../utils/thinky';
import Cart from './Cart';
const type = thinky.type;

const Order = thinky.createModel('Order', {
  id: type.string(),
  createdAt: type.date().default(thinky.r.now()),
  userId: type.string()
});

Order.hasMany(Cart, 'cart', 'id', 'orderId');
Cart.belongsTo(Order, 'order', 'orderId', 'id');

export default Order;
