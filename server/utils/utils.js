const createMessage = (name, message) => {
    return {
        name,
        message,
        date: new Date().getTime()
    }
}

const serverMessage = (name, message, usersRoom) => {
    return {
        name,
        message,
        usersRoom
    }
}

const privateMessage = (receiverID, message, senderName) => {
    return {
        receiverID,
        message,
        senderName
    }
}

module.exports = {
    createMessage,
    serverMessage,
    privateMessage
}