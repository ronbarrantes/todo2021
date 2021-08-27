import express, { Request, Response, NextFunction } from 'express'
import * as http from 'http'
import morgan from 'morgan'
import { json as jsonParser } from 'body-parser'
import { HttpError } from 'http-errors'
import * as mongoose from '../lib/mongoose-connect'

import Todo from '../routes/Todo'

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
    res.json({ message: 'Route does not exist' })
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
            throw new Error('CONNECTION COULD NOT BE MADE')
        }
        if(server)
            throw new Error('There is a server running')
        server = app.listen(PORT, () => {
            console.log(`Server Up @ localhost:${PORT}`)
            // return
        })
    } catch (error) {
        console.error('ERROR:', error)
    }
}

export const stop = async (): Promise<void> => {
    try {
        if(!server)
            throw new Error('There is no server running')

        server.close(() => {
            console.log(`Server off`)
            server = null
        })

        await mongoose.stop()

    } catch (error) {
        console.error('ERROR:', error)
    }

}
