export const errorMessages = {
    error: 'ERROR:',
    mongo:{
        connected: 'There is currently mongo a connection',
        disconnected: 'There is no mongo connection',
    },
    server:{
        cantConnect: 'CONNECTION COULD NOT BE MADE',
        noServerRunning: 'There is no server running',
        serverRunning:'There is a server running',
    },
    httpErrors:{
        idNotAvailable: 'ID not available',
        todoDoesNotExist: 'Todo does not exist',
        nothingToModify: `Nothing to modify for todo with id of $1`,
        missingTask: 'Missing task',
    },
}
export const logMessages = {
    mongo: {
        connected: 'MongoDB Connected',
        disconnected: 'MongoDB Disconnected',
    },
    server:{
        connected: 'Server Up @ localhost:$1',
        disconnected: 'Server off',
    },
}
export const infoMessages = {
    routes: {
        doesNotExist: 'Route does not exist',
    },
    todos: {
        deleted: 'Todo deleted',
    },
}