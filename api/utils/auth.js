import bcrypt from 'bcrypt';

export function hash_password(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (error, salt) {
      if(error) return reject(error);

      bcrypt.hash(password, salt, function (error, hash) {
        if(error) return reject(error);
        return resolve(hash);
      });
    });
  });
}

export function authenticate(password, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (error, response) {
      if(error) return reject(error);
      return resolve(response);
    });
  });
}
