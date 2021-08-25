import express, { Request, Response } from 'express'
const PORT = 3000

const app = express()

app.get('/', (_req: Request, res: Response) => {
    res.send('hello')
})

app.listen(PORT, () => console.log(`SERVER UP @ localhost:${PORT}`))