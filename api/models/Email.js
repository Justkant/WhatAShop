import thinky from '../utils/thinky';
const type = thinky.type;

const Email = thinky.createModel('Email', {
  id: type.string().email(),
  done: type.boolean().default(false),
  createdAt: type.date().default(thinky.r.now())
});

export default Email;
