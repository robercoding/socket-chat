const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage, serverMessage, privateMessage } = require('../utils/utils');

var users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'We need the name or room'
            });
        }
        console.log(data);

        users.addUser(client.id, data.name, data.room)
        client.join(data.room)
        let allUsers = users.getUsers();
        let usersRoom = users.getUsersByRoom(data.room);
        client.to(data.room).emit('userConnect', { name: data.name, usersRoom });

        return callback(usersRoom);
    });


    client.on('disconnect', () => {
        let removedUser = users.removeUser(client.id);
        let usersRoom = users.getUsersByRoom(removedUser.room);
        console.log('removed', removedUser);

        if (!removedUser) {
            client.to(removedUser.room).emit('userDisconnect', serverMessage('Server', `A user has disconnected`, usersRoom));
        } else {
            let message = `${removedUser.name} has disconnected`;
            client.to(removedUser.room).emit('userDisconnect', serverMessage('Server', message, usersRoom));
        }

    });

    client.on('createMessage', (data) => {
        let user = users.getUser(client.id);
        console.log(data);


        if (!data.message) {
            return {
                error: true,
                message: 'We need the name'
            };
        }

        console.log(!user);
        if (!user) {
            return {
                error: true,
                message: `We couldn't find the user`
            };
        }
        client.broadcast.emit('sendMessage', createMessage(user.name, data.message));


        console.log("after sending");
    });

    client.on('privateMessage', (data) => {
        if (!data.receiverID) {}

        let senderUser = users.getUser(client.id);
        let receiverUser = users.getUser(data.receiverID);


        if (!receiverUser || !senderUser) {
            console.log({
                err: true,

                message: 'Receiver or sender is undefined'
            });
            return;
        }
        if (!data.message) {
            console.log({
                err: true,
                message: 'Something went wrong with the data and couldnt be send'
            });
            return;
        }
        client.broadcast.to(receiverUser.id).emit('privateMessage', privateMessage(null, data.message, senderUser.name))

    });



});