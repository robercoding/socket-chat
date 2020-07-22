var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name or room is needed')
}

var name = params.get('name');
var room = params.get('room').toLocaleLowerCase();
var user = {
    name,
    room
}

socket.on('connect', () => {
    socket.emit('enterChat', user, (users) => {
        console.log(users);
    })
});


socket.on('userConnect', (data) => {
    if (!data) {
        return {
            ok: false,
            err: `There's no content on the message`
        }
    }

    console.log(`${data.name} has connected to the chat`);
    console.log(data.usersRoom);
});

socket.on('userDisconnect', (message) => {
    if (!message) {
        return {
            ok: false,
            err: `There's no content on the message`
        }
    }

    console.log(message);
    console.log(`${message.name}: ${message.message}`);
    console.log(message.usersRoom);
});

socket.on('sendMessage', (data) => {

    if (!data) {
        return {
            error: true,
            message: `Couldn't find the data.`
        };
    }

    console.log(data);
    console.log(`${data.name}: ${data.message}`);
});

socket.on('privateMessage', (data) => {
    if (!data) {
        console.log("no data");
    }

    console.log(`[PRIVATE] ${data.senderName}: ${data.message}`);
});