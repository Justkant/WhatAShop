import { Product } from '../models';

function getProducts(req, res) {
  res.json([{
    title: 'Title',
    description: 'Nike shoes',
    imageUrl: 'product.jpg',
    price: '125$'
  }]);
}

function getProduct(req, res) {
  /* pourquoi product pop en orange ? */
  res.json(req.product.getPublic());
}

function addProduct(req, res) {

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price
  });

  product.save().then(() => {
    res.json(product);
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
    });
}

function updateProduct(req, res) {
  const product = {};
  const promises = [];

  if (req.body.title && req.body.title != req.product.title) {
    promises.push(new Promise((resolve, reject) => {
      product.title = req.body.title;
      resolve();
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
      reject();
    }));
  }

  if (req.body.price && req.body.price !== req.product.price) {
    promises.push(new Promise((resolve) => {
      product.price = req.body.price;
      resolve();
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
      reject();
    }));
  }

  if (req.body.description && req.body.description !== req.product.description) {
    promises.push(new Promise((resolve) => {
      product.description = req.body.description;
      resolve();
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
      reject();
    }));
  }

  Promise.all(promises).then(() => {
    req.product.merge(product).save().then((result) => {
      res.json(req.product.getPublic());
    }, (error) => {
      console.error(error);
      res.status(400).json({msg: 'Something went wrong', err: error});
    });
  });
}

function deleteProduct(req, res) {
  req.product.delete().then(() => {
    res.json({msg: 'Account deleted'});
  }, (error) => {
    console.error(error);
    res.status(500).json({msg: 'Contact an administrator', err: error});
  });
}

function search(req, res) {

}

const products = {
  getProducts: getProducts,
  getProduct: getProduct,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  search: search
};

export default products;
