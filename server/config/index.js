const config = {
    development: {
        port: process.env.PORT || 5000
    },
    production: {},

    DB_CONNECTION: process.env.MONGODB_URI /*|| 'mongodb://localhost/kbadb'*/,

    cookie: 'x-auth-token'
}

module.exports = config

        
