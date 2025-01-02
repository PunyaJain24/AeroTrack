const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {PORT} = require('./config/serverConfig')

const setUpAndStartServer = () => {
    app.listen(PORT, () => {
        console.log('Server Started');
    })
};

setUpAndStartServer();