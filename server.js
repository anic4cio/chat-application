const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const port = 3333;

server.listen(port, function() {
    console.log(`The development server is running at port ${port}`)
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get("/styles/style.css", function(req, res) {
    res.sendFile(__dirname + "/styles/style.css")
});

io.on('connection', function(socket) {
    console.log('A user has connected.');

    socket.on('disconnect', function() {
        console.log('A user has disconnected.')
    });
})