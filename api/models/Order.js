import thinky from '../utils/thinky';
import Cart from './Cart';
const type = thinky.type;

const Order = thinky.createModel('Order', {
  id: type.string(),
  createdAt: type.date().default(thinky.r.now()),
  status: type.string().default('validating'),
  userId: type.string(),
  cartTotal: type.number().required()
});

Order.hasMany(Cart, 'cart', 'id', 'orderId');
Cart.belongsTo(Order, 'order', 'orderId', 'id');

export default Order;
