// TODO: Rename this file

import { connect, disconnect, Mongoose } from 'mongoose'
import { mongodb, appName } from '../config'
import { errorMessages, logMessages } from '../constants/messages'

let isConnected = false
let connection: Mongoose | null = null

export const start = async (dbName?: string): Promise<Mongoose> => {
    dbName = dbName || appName

    if(isConnected)
        throw new Error(errorMessages.mongo.connected)

    isConnected = true
    connection = await connect(`${mongodb.url}/${dbName}`)
    console.info(logMessages.mongo.connected)
    return connection
}

export const stop = async (): Promise<null> => {
    if(!isConnected)
        throw new Error(errorMessages.mongo.disconnected)

    console.info(logMessages.mongo.disconnected)
    isConnected = false
    connection = null
    await disconnect()
    return connection
}
