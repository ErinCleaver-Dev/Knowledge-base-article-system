const express = require('express');
const cors = require('cors')
//const bp = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./index')
const bcrypt = require('bcrypt')
// const auth = require('../utils/auth')
const fs = require('fs')
const fileUpload = require("express-fileupload");
const path = require('path')

function setupExpress(app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use(express.static('public'))
    app.set('view engine', 'jsx')
    app.use(express.json())
    app.use(cookieParser())
    app.use(session({ secret: 'faemskjnasfkojn' }, { httpOnly: true }, { secure: true }))
}

module.exports = setupExpress