const express = require('express');
const http = require('http');
var $ = require( "jquery" );

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
var users = [];

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
})