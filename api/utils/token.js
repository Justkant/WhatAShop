import jwt from 'jsonwebtoken';
import config from '../../src/config';

export function generate(id) {
  return jwt.sign({id: id}, config.secret, { expiresIn: '7 days' });
}

export function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}
