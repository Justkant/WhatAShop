function login(req, res) {
  console.log(req);
  res.send({name: 'kant', token: 'bite'});
}

function getUsers(req, res) {
}

function getUser(req, res) {
}

function addUser(req, res) {
  console.log(req);
  res.send({name: 'kant', token: 'bite'});
}

function updateUser(req, res) {
}

function deleteUser(req, res) {
}

const users = {
  login: login,
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};

export default users;