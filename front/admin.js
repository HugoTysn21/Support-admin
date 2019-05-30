'use strict';
const io = require("socket.io");
$(function () {
    let socket = io.connect('http://localhost:3000/');
    let open_conversations = $("#conversation");

    $(open_conversations).click(function () {

        open_conversations.append("<div class='section_reply_conversation'>"
            + "<section class='conv_single_user' id='conv_single_user'></section>" +
            "</div>" + "<div class='reply_message'>" +
            " <section class='reply' id='reply'>" +
            "<input id='write_response' type='text' placeholder='your username' class='write_response'" +
            " <input id='reply_to' type='button' placeholder='send' class='reply_to'" +
            "</section>" + "</div>")
    });
    // alert( "Handler for .click() called." );
});