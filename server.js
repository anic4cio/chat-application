const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('public'));

const server = http.Server(app);
const io = require('socket.io')(server);
var users = [];

const host = "127.0.0.2";
const port = 8080;

server.listen(port, host, function() {
    console.log(`The development server is running at port  ${host}:${port}`)
});

app.get("/", function(req, res) {
    res.sendFile(`${__dirname}/index.html`)
});

app.get("/styles/style.css", function(req, res) {
    res.sendFile(`${__dirname}/styles/style.css`)
});

io.on('connection', function(socket) {
    let name;
    socket.on("has connected", function(username) {
        name = username;
        users.push(username);
        io.emit("has connected", {username: username, usersList: users});
    });

    socket.on('disconnect', function() {
        users.splice(users.indexOf(name), 1);
        io.emit("has disconnected", {username: name, usersList: users});
    });

    socket.on("new message", function(message) {
        io.emit('new message', message)
    })
});