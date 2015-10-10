import config from '../config';
const thinky = require('thinky')(config.rethinkdb);

export default thinky;
