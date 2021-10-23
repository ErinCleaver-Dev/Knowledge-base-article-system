const config = require('./config');
const express = require('express');
const { Router } = require('express')
const app = express();

const routes = require('./routes');
require('./config/express')(app)
require('./config/mongoose')(app)

app.use(routes)


app.listen(config.development.port, () => console.log("Running server"));