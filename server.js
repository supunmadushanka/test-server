const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');
const sql = require('mssql');

var PORT = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());
app.use(cors());

const sqlconfig = {
    db: '*sql.DB',
    user: 'supun',
    password: 'Ranjani1970#',
    server: 'mysport-codefreks.database.windows.net',
    database: 'mysport',
    port: 1433,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};

app.get('/', function(req, res) {
    let connection = sql.connect(sqlconfig, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('db connected');
        }
    });
})

app.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
});

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

app.post('/test1', function(req, res) {
    res.status(200).send({ "message": "Data received" });
})