const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service')

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        
        sendBasicEmail(
            'punyajain_ae21b14_77@dtu.ac.in',
            'punyajain06@gmail.com',
            'This is a testing mail',
            'Hey, how are you I hope this email finds you well!!'
        );
    });
}

setupAndStartServer();