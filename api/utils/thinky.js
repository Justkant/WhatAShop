import config from '../../src/config';
const thinky = require('thinky')(config.rethinkdb);

export default thinky;
