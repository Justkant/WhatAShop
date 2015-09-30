module.exports = {
    development: {
        isProduction: false,
        apiPort: process.env.APIPORT,
        rethinkdb: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME
        }
    },
    production: {
        isProduction: true,
        apiPort: process.env.APIPORT,
        rethinkdb: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME
        }
    }
}[process.env.NODE_ENV || 'development'];
