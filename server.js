const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');

var PORT = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send('hello from server');
})

app.post('/test', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supunmadushanka19980822@gmail.com',
            pass: 'mynameissuperman#'
        }
    });

    var mailOptions = {
        from: 'supunmadushanka19980822@gmail.com',
        to: 'supunmadushanka19980822@gmail.com',
        subject: req.body.email + ' - ' + req.body.FullName,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info);
        }
    });
})

app.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
});