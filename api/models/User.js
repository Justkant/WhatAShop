import thinky from '../utils/thinky';
const type = thinky.type;

const User = thinky.createModel('User', {
  id: type.string(),
  username: type.string().required(),
  email: type.string().email().required(),
  password: type.string().required(),
  admin: type.boolean().default(true),
  createdAt: type.date().default(thinky.r.now()),
  token: type.string(),
  pictureUrl: type.string()
});

User.define('getPublic', function() {
  delete this.password;
  return this;
});

export default User;
