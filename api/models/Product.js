import thinky from '../utils/thinky';
const type = thinky.type;

const Product = thinky.createModel('Product', {
  id: type.string(),
  title: type.string().required(),
  description: type.string().optional(),
  imageUrl: type.string().optional(),
  price: type.number().required()
});

export default Product;
