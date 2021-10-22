const mongoose = require('mongoose')
const config = require('./index')

function setupMongoose(app) {

    mongoose.connect(config.DB_CONNECTION).then(() => {
        console.log('Database is connected')
    })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'))
    db.on('open', console.log.bind(console, 'connection is opened'))
}

module.exports = setupMongoose