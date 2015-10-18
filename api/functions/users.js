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
    user.token = generate(user.email);
    user.save().then(() => {
      res.cookie('auth', user.token, {maxAge: ms('7 days')});
      res.json(user);
    }, (error) => {
      console.error(error);
      res.status(500).json({msg: 'Contact an administrator', err: error});
    });
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
          res.json(user);
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

function getUsers(req, res) {
  res.json([{username: 'kant'}]);
}

function getUser(req, res) {
  res.json({username: 'kant'});
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
}

function deleteUser(req, res) {
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
  deleteUser: deleteUser
};

export default users;
