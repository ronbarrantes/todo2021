import express, { Request, Response } from 'express'
import * as http from 'http'

import Todo from '../routes/Todo'

const PORT = 3000
let server: http.Server | null

// fake state
const app = express()
app.use(express.json())
app.use(Todo)
app.get('/', (_req: Request, res: Response) => {
    return res.send('hello')
})

export const start = (): void => {
    try {
        if(server)
            throw new Error('There is a server running')
        server = app.listen(PORT, () => {
            console.log(`Server Up @ localhost:${PORT}`)
            return
        })
    } catch (error) {
        console.error('ERROR:', error)
    }
}

export const stop = (): void => {
    try {
        if(!server)
            throw new Error('There is no server running')

        server.close(() => {
            console.log(`Server off`)
            server = null
        })

    } catch (error) {
        console.error('ERROR:', error)
    }
}
