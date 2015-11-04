import thinky from '../utils/thinky';
import Cart from './Cart';
const type = thinky.type;

const Product = thinky.createModel('Product', {
  id: type.string(),
  title: type.string().required(),
  description: type.string().optional(),
  imageUrl: type.string().optional(),
  price: type.number().required(),
  createdAt: type.date().default(thinky.r.now())
});

Product.hasMany(Cart, 'usersCart', 'id', 'productId');
Cart.belongsTo(Product, 'product', 'productId', 'id');

export default Product;
