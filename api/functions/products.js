import { Product } from '../models';
import { shuffle } from '../utils/functions';

function getProducts(req, res) {
  Product.orderBy('-createdAt').run().then((result) => {
    res.json(result);
  });
}

function getProduct(req, res) {
  Product.get(req.params.id).run().then((product) => {
    res.json(product);
  }, (error) => {
    res.status(404).json({msg: 'Product not found'});
  });
}

function addProduct(req, res) {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: 0
  });

  product.save().then(() => {
    res.json(product);
  }, (error) => {
    console.error(error);
    res.status(500).json({msg: 'Contact an administrator', err: error});
  });
}

function updateProduct(req, res) {
  Product.get(req.params.id).run().then((product) => {
    product.merge(req.body).save().then((result) => {
      res.json(product);
    }, (error) => {
      console.error(error);
      res.status(400).json({msg: 'Something went wrong', err: error});
    });
  }, (error) => {
    res.status(404).json({msg: 'Product not found'});
  });
}

function deleteProduct(req, res) {
  Product.get(req.params.id).run().then((product) => {
    product.delete().then(() => {
      res.json({msg: 'Product deleted'});
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
    });
  }, (error) => {
    res.status(404).json({msg: 'Product not found'});
  });
}

function search(req, res) {

}

function getMarket(req, res) {
  Product.run().then((result) => {
    res.json(shuffle(result));
  });
}

const products = {
  getProducts: getProducts,
  getProduct: getProduct,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  search: search,
  getMarket: getMarket
};

export default products;
