import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://localhost:' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor(req, res) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => {
        return new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));

          if (params) request.query(params);

          if (__SERVER__) {
            if (req.get('cookie')) {
              request.set('cookie', req.get('cookie'));
            }
          } else {
            if (window.localStorage.token) {
              request.set('x-api-token', window.localStorage.token);
            }
          }
          if (data) request.send(data);

          request.end((err, { body, header } = {}) => {
            if (__SERVER__) res.set('set-cookie', header['set-cookie']);

            if (err) {
              reject(body || err);
            } else {
              resolve(body);
            }
          });
        });
      };
    });
  }
}
