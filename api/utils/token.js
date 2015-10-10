import jwt from 'jsonwebtoken';
import config from '../config';

export function generate(email) {
  return jwt.sign(email, config.secret, { expiresIn: '7d' });
}

export function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}
