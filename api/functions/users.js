import { User, Email } from '../models';
import { hash_password, authenticate } from '../utils/auth';
import { generate, verify } from '../utils/token';
import ms from 'ms';

function load(req, res) {
  if (req.cookies.auth) {
    verify(req.cookies.auth).then((email) => {
      User.filter({email: email}).then((results) => {
        if (results.length > 0) {
          let user = results[0];
          if (user.token === req.cookies.auth) {
            user.token = generate(user.email);
            user.save().then(() => {
              res.cookie('auth', user.token, {maxAge: ms('7 days')});
              res.json(user);
            }, (error) => {
              console.error(error);
              res.status(500).json({msg: 'Contact an administrator', err: error});
            });
          } else {
            res.clearCookie('auth');
            res.json(null);
          }
        } else {
          res.clearCookie('auth');
          res.json(null);
        }
      }, (error) => {
        console.error(error);
        res.clearCookie('auth');
        res.json(null);
      });
    }, (error) => {
      console.error(error);
      res.clearCookie('auth');
      res.json(null);
    });
  } else {
    res.json(null);
  }
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
