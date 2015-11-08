import { User, Email, Product, Cart, Order } from '../models';
import { hash_password, authenticate } from '../utils/auth';
import { generate, verify } from '../utils/token';
import ms from 'ms';

function checkToken(req, res, cb, error) {
  const token = req.get('x-api-token') || req.cookies.auth;
  if (token) {
    verify(token).then((decoded) => {
      if (decoded.id) {
        User.get(decoded.id).getJoin({orders: {cart: {product: true}}, cart: {product: true}}).then((user) => {
          if (user.token === token) {
            cb(user);
          } else {
            res.clearCookie('auth');
            res.status(error.status).json(error.body);
          }
        }, (err) => {
          console.error(err.message);
          res.clearCookie('auth');
          res.status(error.status).json(error.body);
        });
      } else {
        res.clearCookie('auth');
        res.status(error.status).json(error.body);
      }
    }, (err) => {
      console.error(err.message);
      res.clearCookie('auth');
      res.status(error.status).json(error.body);
    });
  } else {
    res.status(error.status).json(error.body);
  }
}

function auth(req, res, next) {
  checkToken(req, res, (user) => {
    req.user = user;
    next();
  }, { status: 401, body: {msg: 'Unauthorized'}});
}

function load(req, res) {
  checkToken(req, res, (user) => {
    res.json(user.getPublic());
  }, { status: 200, body: null});
}

function login(req, res) {
  User.filter({email: req.body.email}).then((results) => {
    if (results.length > 0) {
      let user = results[0];
      authenticate(req.body.password, user.password).then(() => {
        user.token = generate(user.id);
        user.save().then(() => {
          res.cookie('auth', user.token, {maxAge: ms('7 days')});
          res.json(user.getPublic());
        }, (error) => {
          console.error(error.message);
          res.status(500).json({msg: 'Contact an administrator', err: error.message});
        });
      }, (error) => {
        console.error(error.message);
        res.status(400).json({msg: 'Bad password', err: error.message});
      });
    } else {
      res.status(404).json({msg: 'No user with this email'});
    }
  }, (error) => {
    console.error(error.message);
    res.status(500).json({msg: 'Contact an administrator', err: error.message});
  });
}

function logout(req, res) {
  res.clearCookie('auth');
  res.json(null);
}

/**
* @api {get} /users Request All Users
* @apiName GetUsers
* @apiGroup User
*/
function getUsers(req, res) {
  User.orderBy('-createdAt').run().then((result) => {
    res.json(result);
  });
}

/**
* @api {get} /users/:id Request User Information
* @apiName GetUser
* @apiGroup User
*
* @apiParam {Number} id Users unique ID.
*
* @apiSuccess {String} username The users name.
* @apiSuccess {String} email The users email.
* @apiSuccess {String} token The users token.
* @apiSuccess {String} pictureUrl The users picture url.
* @apiSuccess {Boolean} admin The users right.
* @apiSuccess {Date} createdAt The users creation date.
*
* @apiSuccessExample Example data on success:
* {
*   username: 'Kant',
*   email: 'Kant@gmail.com',
*   token: 'IOEJVofz@fohinsmov24azd5niermogunqeprofinzqoe8297',
*   pictureUrl: 'uploads/picture-94305067460.png',
*   admin: true,
*   createdAt: Wed Oct 21 2015 14:33:53 GMT+00:00
* }
*/
function getUser(req, res) {
  res.json(req.user.getPublic());
}

function addUser(req, res) {
  const email = new Email({
    id: req.body.email
  });

  email.save().then(() => {
    hash_password(req.body.password).then((password) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: password
      });

      user.save().then(() => {
        email.done = true;
        email.save().then(() => {
          user.token = generate(user.id);
          user.save().then(() => {
            res.cookie('auth', user.token, {maxAge: ms('7 days')});
            res.json(user);
          }, (error) => {
            console.error(error.message);
            res.status(500).json({msg: 'Contact an administrator', err: error.message});
          })
        }, (error) => {
          console.error(error.message);
          res.status(500).json({msg: 'Contact an administrator', err: error.message});
        });
      }, (error) => {
        email.delete();
        console.error(error.message);
        res.status(400).json({msg: 'Something went wrong', err: error.message});
      });
    }, (error) => {
      console.error(error.message);
      res.status(500).json({msg: 'Contact an administrator', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(409).json({msg: 'Email already exist', err: error.message});
  });
}

function updateUser(req, res) {
  const user = {};
  const promises = [];

  if (req.body.email && req.body.email !== req.user.email) {
    promises.push(new Promise((resolve, reject) => {
      const email = new Email({
        id: req.body.email,
        done: true
      });

      email.save().then(() => {
        Email.get(req.user.email).delete().then(() => {
          user.email = req.body.email;
          resolve();
        }, (error) => {
          console.error(error.message);
          res.status(500).json({msg: 'Contact an administrator', err: error.message});
          reject();
        });
      }, (error) => {
        console.error(error.message);
        res.status(409).json({msg: 'Email already exist', err: error.message});
        reject();
      });
    }));
  }
  if (req.body.currentPassword && req.body.newPassword) {
    promises.push(new Promise((resolve, reject) => {
      authenticate(req.body.currentPassword, req.user.password).then(() => {
        hash_password(req.body.newPassword).then((password) => {
          user.password = password;
          resolve();
        }, (error) => {
          console.error(error.message);
          res.status(500).json({msg: 'Contact an administrator', err: error.message});
          reject();
        });
      }, (error) => {
        console.error(error.message);
        res.status(400).json({msg: 'Bad password', err: error.message});
        reject();
      });
    }));
  }
  if (req.body.username && req.body.username !== req.user.username) {
    promises.push(new Promise((resolve) => {
      user.username = req.body.username;
      resolve();
    }))
  }
  Promise.all(promises).then(() => {
    req.user.merge(user).save().then((result) => {
      res.json(req.user.getPublic());
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  });
}

function deleteUser(req, res) {
  req.user.deleteAll({cart: true, orders: {cart: true}}).then(() => {
    Email.get(req.user.email).delete().then(() => {
      res.json({msg: 'Account deleted'});
    }, (error) => {
      console.error(error.message);
      res.status(500).json({msg: 'Contact an administrator', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(400).json({msg: 'Something went wrong', err: error.message});
  });
}

function isOwner(req, res, next) {
  if (req.user.id === req.params.id || req.user.admin) {
    next();
  } else {
    res.status(401).json({msg: 'Unauthorized'});
  }
}

function isAdmin(req, res, next) {
  if (req.user.admin) {
    next();
  } else {
    res.status(401).json({msg: 'Unauthorized'});
  }
}

function getUserCart(req, res) {
  res.json(req.user.cart);
}

function addUserProduct(req, res) {
  Product.get(req.body.productId).run().then((product) => {
    const cart = new Cart({
      id: product.id + '-' + req.user.id,
      nbItem: req.body.nbItem,
      product: product,
      userId: req.user.id
    });

    cart.saveAll().then((result) => {
      res.json(result);
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Product not found', err: error.message});
  });
}

function deleteCart(cart) {
  const deletes = [], promises = [];

  cart.forEach((cartItem) => {
    deletes.push(cartItem.delete.bind(cartItem));
  });

  deletes.forEach((del) => {
    promises.push(del());
  });

  return Promise.all(promises);
}

function deleteUserCart(req, res) {
  deleteCart(req.user.cart).then(() => {
    res.json({msg: 'Cart deleted'});
  }, (error) => {
    console.error(error.message);
    res.status(400).json({msg: 'Something went wrong', err: error.message});
  })
}

function getUserCartItem(req, res) {
  Cart.get(req.params.cartId).getJoin().run().then((cartItem) => {
    res.json(cartItem);
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Cart Item not found', err: error.message});
  });
}

function updateCartItem(req, res) {
  Cart.get(req.params.cartId).getJoin().run().then((cartItem) => {
    cartItem.nbItem = req.body.nbItem;
    cartItem.save().then(() => {
      res.json(cartItem);
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Cart Item not found', err: error.message});
  });
}

function deleteCartItem(req, res) {
  Cart.get(req.params.cartId).run().then((cartItem) => {
    cartItem.delete().then(() => {
      res.json({msg: 'Cart item deleted'});
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Cart Item not found', err: error.message});
  });
}

function getUserOrders(req, res) {
  res.json(req.user.orders);
}

function validateCart(req, res) {
  (new Order({
    userId: req.user.id
  })).save().then((result) => {
    req.user.cart.forEach((cartItem) => {
      (new Cart({
        nbItem: cartItem.nbItem,
        productId: cartItem.productId,
        orderId: result.id
      })).save();
    });

    deleteCart(req.user.cart).then(() => {
      res.json(result);
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(400).json({msg: 'Something went wrong', err: error.message});
  });
}

function getUserOrder(req, res) {
  Order.get(req.params.orderId).getJoin().run().then((order) => {
    res.json(order);
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Order not found', err: error.message});
  });
}

function updateOrder(req, res) {
  Order.get(req.params.orderId).getJoin().run().then((order) => {
    order.status = req.body.status;
    order.save().then(() => {
      res.json(order);
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Order not found', err: error.message});
  });
}

function deleteOrder(req, res) {
  Order.get(req.params.orderId).getJoin().run().then((order) => {
    order.deleteAll({cart: true}).then(() => {
      res.json({msg: 'Order deleted'});
    }, (error) => {
      console.error(error.message);
      res.status(400).json({msg: 'Something went wrong', err: error.message});
    });
  }, (error) => {
    console.error(error.message);
    res.status(404).json({msg: 'Order not found', err: error.message});
  });
}

const users = {
  auth: auth,
  load: load,
  login: login,
  logout: logout,
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  isOwner: isOwner,
  isAdmin: isAdmin,
  getUserCart: getUserCart,
  addUserProduct: addUserProduct,
  deleteUserCart: deleteUserCart,
  getUserCartItem: getUserCartItem,
  updateCartItem: updateCartItem,
  deleteCartItem: deleteCartItem,
  getUserOrders: getUserOrders,
  validateCart: validateCart,
  getUserOrder: getUserOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder
};

export default users;
