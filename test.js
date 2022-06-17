var express = require('express');
var socket = require('socket.io');

if(express) {
    console.log(`It's there. ${express}`);
} else {
    console.log(`It isn't there. ${express}`);
}


if(socket) {
    console.log(`It's there. ${socket}`);
} else {
    console.log(`It isn't there. ${socket}`);
}