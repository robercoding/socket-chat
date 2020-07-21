var socket = io();

socket.on('connect', function() {
    console.log('connected');
});

socket.on('disconnect', () => {
    console.log('disconnected');
});

socket.emit('messageFromClient', 'A client has been connected');

socket.on('messageFromServer', (data) => {
    console.log('server', data);
});