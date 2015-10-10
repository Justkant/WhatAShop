import thinky from '../utils/thinky';
const type = thinky.type;

const User = thinky.createModel('User', {
  id: type.string(),
  username: type.string().required(),
  email: type.string().email().required(),
  password: type.string().required(),
  admin: type.boolean().default(false),
  createdAt: type.date().default(thinky.r.now())
});

export default User;
