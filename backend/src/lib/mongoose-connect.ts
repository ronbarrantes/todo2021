import { connect, disconnect, Mongoose } from 'mongoose'
import { mongodb } from '../config'
import { errorMessages, logMessages } from '../constants/messages'

let isConnected = false
let connection: Mongoose | null = null

export const start = async (): Promise<Mongoose> => {
    if(isConnected)
        throw new Error(errorMessages.mongo.connected)

    isConnected = true
    connection = await connect(mongodb.url)
    console.log(logMessages.mongo.connected)
    return connection
}

export const stop = async (): Promise<null> => {
    if(!isConnected)
        throw new Error(errorMessages.mongo.disconnected)

    console.log(logMessages.mongo.disconnected)
    isConnected = false
    connection = null
    await disconnect()
    return connection
}
