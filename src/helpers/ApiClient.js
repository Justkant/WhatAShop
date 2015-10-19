import superagent from 'superagent';
import config from '../config';

class ApiClient_ {
  constructor(req, res) {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[method] = (path, options) => {
        return new Promise((resolve, reject) => {
          const request = superagent[method](this.formatUrl(path));
          if (options && options.params) {
            request.query(options.params);
          }
          if (__SERVER__) {
            if (req.get('cookie')) {
              request.set('cookie', req.get('cookie'));
            }
          } else {
            if (window.localStorage.token) {
              request.set('x-api-token', window.localStorage.token);
            }
          }
          if (options && options.data) {
            request.send(options.data);
          }
          request.end((err, response) => {
            if (__SERVER__) {
              res.set('set-cookie', response.header['set-cookie']);
            }
            if (err) {
              reject((response && response.body) || err);
            } else {
              resolve(response.body);
            }
          });
        });
      };
    });
  }

  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.apiPort + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
