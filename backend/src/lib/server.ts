import express, { Request, Response, NextFunction } from 'express'
import * as http from 'http'
import morgan from 'morgan'
import { json as jsonParser } from 'body-parser'
import { HttpError } from 'http-errors'
import * as mongooseConnect from '../lib/mongoose-connect'

import todo from '../routes/todo'
import * as config from '../config'
import {
    errorMessages as errMsg,
    infoMessages as infMsg,
    logMessages as logMsg,
} from '../constants/messages'

const PORT = process.env.PORT || config.port
let server: http.Server | null

const app = express()
app.use(jsonParser())
app.use(morgan(config.isProduction ? 'combined' : 'dev'))

// ROUTES
app.use(todo)

app.get('/', (_req: Request, res: Response) => {
    return res.json({ message: 'Todo App' })
})

app.all('*', (_req: Request, res: Response) => {
    res.json({ message: infMsg.routes.doesNotExist })
})

// ERROR MIDDLEWARE
app.use((err: HttpError, _req: Request, res: Response, next: NextFunction) => {
    console.error(err)

    if(err.status)
        return res.sendStatus(err.status)

    const message = err.message.toLowerCase()

    if(message.includes('objectid failed'))
        return res.sendStatus(404)

    if(message.includes('validation failed'))
        return res.sendStatus(400)

    if(message.includes('duplicate key'))
        return res.sendStatus(409)

    if(message.includes('unauthorized'))
        return res.sendStatus(401)

    res.sendStatus(500)
    return next()
})

export const start = async (dbName?: string): Promise<void> => {
    try {
        const connection = await mongooseConnect.start(dbName)
        if(!connection) {
            throw new Error(errMsg.server.cantConnect)
        }
        if(server)
            throw new Error(errMsg.server.serverRunning)
        server = app.listen(PORT, () => {
            console.log(logMsg.server.connected.replace('$1', `${PORT}`))
        })
    } catch (error) {
        console.error(errMsg.error, error)
    }
}

export const stop = async (): Promise<void> => {
    try {
        if(!server)
            throw new Error(errMsg.server.noServerRunning)

        server.close(() => {
            console.log(logMsg.server.disconnected)
            server = null
        })

        await mongooseConnect.stop()

    } catch (error) {
        console.error(errMsg.error, error)
    }

}
