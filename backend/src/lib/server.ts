import express, { Request, Response, NextFunction } from 'express'
import * as http from 'http'
import morgan from 'morgan'
import { json as jsonParser } from 'body-parser'
import { HttpError } from 'http-errors'
import * as mongoose from '../lib/mongoose-connect'

import Todo from '../routes/todo'
import { errorMessages, infoMessages, logMessages } from '../constants/messages'

const PORT = 3000
const production = false
let server: http.Server | null

const app = express()
app.use(jsonParser())
app.use(morgan(production ? 'combined' : 'dev'))

// ROUTES
app.use(Todo)

app.get('/', (_req: Request, res: Response) => {
    return res.json({ message: 'Todo App' })
})

app.all('*', (_req: Request, res: Response) => {
    res.json({ message: infoMessages.routes.doesNotExist })
})

// ERROR MIDDLEWARE
app.use((err: HttpError, _req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if(err.status)
        return res.sendStatus(err.status)
    res.sendStatus(500)
    return next()
})

export const start = async (): Promise<void> => {

    try {
        const connection = await mongoose.start()
        if(!connection) {
            throw new Error(errorMessages.server.cantConnect)
        }
        if(server)
            throw new Error(errorMessages.server.serverRunning)
        server = app.listen(PORT, () => {
            console.log(logMessages.server.connected.replace('$1', `${PORT}`))
        })
    } catch (error) {
        console.error(errorMessages.error, error)
    }
}

export const stop = async (): Promise<void> => {
    try {
        if(!server)
            throw new Error(errorMessages.server.noServerRunning)

        server.close(() => {
            console.log(logMessages.server.disconnected)
            server = null
        })

        await mongoose.stop()

    } catch (error) {
        console.error(errorMessages.error, error)
    }

}
