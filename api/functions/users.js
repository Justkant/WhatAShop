import { User, Email } from '../models';

function load(req, res) {
  res.json(null);
}

function login(req, res) {
  User.filter({email: req.body.email}).then((results) => {
    if (results.length > 0) {
      const user = results[0];
      if (user.password === req.body.password) {
        res.json(user);
      } else {
        res.status(400).json({msg: 'Bad password'});
      }
    } else {
      res.status(404).json({msg: 'No user with this email'});
    }
  }, (error) => {
    res.status(500).json({msg: 'Contact an administrator', err: error});
  });
}

function logout(req, res) {
  res.json(null);
}

function getUsers(req, res) {
  res.json([{username: 'kant'}]);
}

function getUser(req, res) {
  res.json({username: 'kant'});
}

function addUser(req, res) {
  console.log(req.body);
  const email = new Email({
    id: req.body.email
  });

  email.save().then(() => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    user.save().then(() => {
      email.done = true;
      email.save().then(() => {
        res.json(user);
      }, (error) => {
        console.error(error);
        res.status(500).json({msg: 'Contact an administrator', err: error});
      });
    }, (error) => {
      email.delete(() => {
        console.error(error);
        res.status(400).json({msg: 'Something went wrong', err: error});
      });
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
