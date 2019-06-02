'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const mysql = require('mysql');

let allSocketsData = [];
let socketsData = JSON.stringify(allSocketsData);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.static('front'));

app.get('/admin', (req, res) => {
    res.render('admin', {data: JSON.stringify(allSocketsData)})
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
});

io.on('connect', (socket) => {

    console.log('new user connected');

    socket.on('admin',() => {
        console.log(socket.id);
        let admin_sock = socket.id;
        io.sockets.emit('administrator', {socket: admin_sock})

    });
    let data_admin = function () {
        return socket.on('data_admin',(data_m)=> {
            console.log(data_m.socket);
        });
    };

    // socket.on('admin',() => {
    //     console.log(socket.id);
    //     let admin_socket = socket.id;
        socket.on('new_message', (data) => {

            data_admin();
            console.log(data_admin(),"ttt");
            // console.log(admin_socket);
            // io.sockets.emit('new_message', {message: data.message, username: data.username, socket: socket.id});
            // socket.to(admin_socket).emit('new_message',data)
            io.sockets.emit('new_message',data)
            // let singleDATA = {theSocket: socket.id, message: data.message, username: data.username};
            // allSocketsData.push(singleDATA);
            // console.log(allSocketsData)
        });
    // });

    socket.on('new_answer', (data) => {
        socket.to(data.id).emit('private_message',{message: data.message, username: data.username})
    });

    socket.on('disconnect', function () {
        console.log('User disconnect!');

        for (let i = 0; i < allSocketsData.length; i++) {

            if (allSocketsData[i].theSocket === socket.id) {
                allSocketsData.splice(i, 1);
            }
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});