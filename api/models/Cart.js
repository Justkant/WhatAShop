import thinky from '../utils/thinky';
const type = thinky.type;

const Cart = thinky.createModel('Cart', {
  id: type.string(),
  nbItem: type.number().default(1),
  userId: type.string(),
  orderId: type.string(),
  productId: type.string()
});

export default Cart;
