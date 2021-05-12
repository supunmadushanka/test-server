const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var PORT = process.env.PORT || 3001
const app = express();
app.use(bodyParser.json());
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

http.listen(PORT, () => {
    console.log('listening on *:3001');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', msg);
    });
});


app.get('/', function(req, res) {
    res.send('server run');
})