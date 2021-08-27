import { connect, disconnect, Mongoose } from 'mongoose'
import { mongodb } from '../config'

let isConnected = false
let connection: Mongoose | null = null

export const start = async (): Promise<Mongoose> => {
    if(isConnected)
        throw new Error('There is currently mongo a connection')

    isConnected = true
    connection = await connect(mongodb.url)
    console.log('MONGODB CONNECTED')
    return connection
}

export const stop = async (): Promise<null> => {
    if(!isConnected)
        throw new Error('There is no mongo connection')

    console.log('DISCONNECTED FROM MONGO')
    isConnected = false
    connection = null
    await disconnect()
    return connection
}
