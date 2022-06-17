const express = require('express');
const http = require('http');
const io = require('socket.io')(server);

const app = express();
const server = http.Server(app);

const port = 3333;

server.listen(port, function() {
    console.log(`The development server is running at port ${port}`)
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});