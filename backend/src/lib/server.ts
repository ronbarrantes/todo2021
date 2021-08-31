import express, { Request, Response } from 'express'
import * as http from 'http'
import morgan from 'morgan'
import { json as jsonParser } from 'body-parser'
import * as mongooseConnect from './mongooseConnect'
import { errorMiddleware } from '../middleware/errorMiddleware'

import todo from '../routes/todo'
import * as config from '../config'
import {
    errorMessages as errMsg,
    logMessages as logMsg,
} from '../constants/messages'

const PORT = process.env.PORT || config.port
let server: http.Server | null

const app = express()
app.use(jsonParser())
app.use(morgan(config.isProduction ? 'combined' : 'dev'))

// ROUTES
app.use(todo)
app.get('/', (_req: Request, res: Response) => res.json({ message: 'Todo App' }))
app.all('*', (_req: Request, res: Response) => res.sendStatus(404))
app.use(errorMiddleware)

export const start = async (dbName?: string): Promise<void> => {
    try {
        const connection = await mongooseConnect.start(dbName)
        if(!connection) {
            throw new Error(errMsg.server.cantConnect)
        }
        if(server)
            throw new Error(errMsg.server.serverRunning)
        server = app.listen(PORT, () => {
            console.info(logMsg.server.connected.replace('$1', `${PORT}`))
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
            console.info(logMsg.server.disconnected)
            server = null
        })

        await mongooseConnect.stop()

    } catch (error) {
        console.error(errMsg.error, error)
    }
}
