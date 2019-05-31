'use strict';


// MARK: - Static fields
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const mysql = require('mysql');

// MARK: - Fields
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

// // Create connection db
// // const db =  mysql.createConnection({
// //     host     : 'localhost',
// //     user     : 'root',
// //     password : 'password',
// // });
// //
// // // db connect
// // db.connect((err) => {
// //     if (err){
// //         throw err
// //     }
// //     console.log('mysql')
// // });
// // app.get('/createdb',(req,res) => {
// //     let sql = 'CREATE DATABASE node_socket_mysql';
// //     db.query(sql,(err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('database created')
// //     })
// // });
// // app.get('/')

// lors du press du button send il va get l'username et le message et va le set dans un object qui sera lié a la SOCKET propre a l'user,
// cet object sera set dans un array de dans la fonction SOCKETS, cette fonction get le tableau de toute les socket.
// puis c'est cet array que je passe a la passe admin, puis je le traite.

// faire un base qui sera db et je vais set


// MARK: - METHODS
io.on('connect',(socket) => {
    console.log('new user connected');

    // socket.username = 'Anonymous';

    socket.on('new_message',(data) => {
        io.sockets.emit('new_message',{message: data.message, username: data.username, socket: socket.id});
        let singleDATA =  {theSocket: socket.id, message: data.message, username: data.username};
        allSocketsData.push(singleDATA);
        console.log(allSocketsData)
    });

    socket.on('new_reply_message',(data) => {
         io.to("socket.id").emit('private_message',data );
    });

    socket.on('disconnect', function() {
        console.log('User disconnect!');

        for(let i=0; i < allSocketsData.length; i++) {

            if (allSocketsData[i].theSocket === socket.id) {
                allSocketsData.splice(i, 1);
            }
        }
     });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});