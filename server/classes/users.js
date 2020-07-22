class Users {

    constructor() {
        this.users = [];

    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        let user = this.users.filter(user => user.id === id)[0];

        return user;
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        let usersRoom = this.users.filter(user => user.room === room);
        return usersRoom;
    }

    removeUser(id) {
        let removedUser = this.getUser(id);
        if (!removedUser) {
            return;
        }
        this.users = this.users.filter(user => user.id != removedUser.id);

        return removedUser;
    }
}

module.exports = {
    Users
}