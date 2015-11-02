import { User, Email } from '../models';
import { hash_password, authenticate } from '../utils/auth';
import { generate, verify } from '../utils/token';
import ms from 'ms';

function checkToken(req, res, cb, error) {
  const token = req.get('x-api-token') || req.cookies.auth;
  if (token) {
    verify(token).then((decoded) => {
      User.filter({email: decoded.email}).then((results) => {
        if (results.length > 0) {
          let user = results[0];
          if (user.token === token) {
            cb(user);
          } else {
            res.clearCookie('auth');
            res.status(error.status).json(error.body);
          }
        } else {
          res.clearCookie('auth');
          res.status(error.status).json(error.body);
        }
      }, (error) => {
        console.error(error);
        res.clearCookie('auth');
        res.status(error.status).json(error.body);
      });
    }, (error) => {
      console.error(error);
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
        user.token = generate(user.email);
        user.save().then(() => {
          res.cookie('auth', user.token, {maxAge: ms('7 days')});
          res.json(user.getPublic());
        }, (error) => {
          console.error(error);
          res.status(500).json({msg: 'Contact an administrator', err: error});
        });
      }, (error) => {
        console.error(error);
        res.status(400).json({msg: 'Bad password', err: error});
      });
    } else {
      res.status(404).json({msg: 'No user with this email'});
    }
  }, (error) => {
    console.error(error);
    res.status(500).json({msg: 'Contact an administrator', err: error});
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
        password: password,
        token: generate(req.body.email)
      });

      user.save().then(() => {
        email.done = true;
        email.save().then(() => {
          res.cookie('auth', user.token, {maxAge: ms('7 days')});
          res.json(user);
        }, (error) => {
          console.error(error);
          res.status(500).json({msg: 'Contact an administrator', err: error});
        });
      }, (error) => {
        email.delete();
        console.error(error);
        res.status(400).json({msg: 'Something went wrong', err: error});
      });
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
    });
  }, (error) => {
    console.error(error);
    res.status(409).json({msg: 'Email already exist', err: error});
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
          user.token = generate(user.email);
          res.cookie('auth', user.token, {maxAge: ms('7 days')});
          resolve();
        }, (error) => {
          console.error(error);
          res.status(500).json({msg: 'Contact an administrator', err: error});
          reject();
        });
      }, (error) => {
        console.error(error);
        res.status(409).json({msg: 'Email already exist', err: error});
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
          console.error(error);
          res.status(500).json({msg: 'Contact an administrator', err: error});
          reject();
        });
      }, (error) => {
        console.error(error);
        res.status(400).json({msg: 'Bad password', err: error});
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
      console.error(error);
      res.status(400).json({msg: 'Something went wrong', err: error});
    });
  });
}

function deleteUser(req, res) {
  req.user.delete().then(() => {
    Email.get(req.user.email).delete().then(() => {
      res.json({msg: 'Account deleted'});
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
    });
  }, (error) => {
    console.error(error);
    res.status(400).json({msg: 'Something went wrong', err: error});
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
  res.json(req.body);
}

function getUserOrders(req, res) {
  res.json(req.user.Orders);
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
  getUserOrders: getUserOrders
};

export default users;
