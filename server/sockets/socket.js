const { io } = require('../server');

io.on('connection', (client) => {

    client.on('disconnect', () => {
        console.log('Client has been disconected');
    });

    client.on('messageFromClient', (data) => {
        console.log(data);
        client.broadcast.emit('messageFromServer', data);
    });
});