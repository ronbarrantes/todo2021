import express, { Request, Response } from 'express'
import Todo from './routes/Todo'

const PORT = 3000

// fake state
const app = express()
app.use(express.json())

app.use(Todo)

app.get('/', (_req: Request, res: Response) => {
    return res.send('hello')
})

app.listen(PORT, () => console.log(`SERVER UP @ localhost:${PORT}`))