'use strict';
const io = require("socket.io");
$(function(){
    let socket = io.connect('http://localhost:3000/');

    let username  = $("#username");
    let send_username  = $("#send_username");
    let message = $("#message");
    let send_message  = $("#send_message");

    send_username.click(() => {
        console.log(username.val());
        socket.emit('change_username', {username: username.val()})
    });
    send_message.click(()=>{
        console.log(message.val());
        socket.emit('new_message', {message: message.val()})
    });
});