import express, { Request, Response } from 'express'
import { nanoid } from 'nanoid'

const PORT = 3000

// fake state
interface ITodo {
    // what does it need
    id: string;
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number
}
const state: Map<string, ITodo> = new Map()
const app = express()
app.use(express.json())

const setTask = (payload: ITodo) => {
    const { id, createdAt, completed, task } = payload
    const currDate = Date.now()
    return {
        id: id || nanoid(8),
        createdAt: createdAt || currDate,
        modifiedAt: currDate,
        completed: completed || false,
        task,
    }
}

// get a todo
app.get('/todos/allTodos', (_req: Request, res: Response) => {
    return res.json([...state].map((val) => val[1]))
})

// post a todo
app.post('/todos/addTodo', (req: Request, res: Response) => {
    const currTask = <ITodo>req.body

    if(!currTask.task){
        return res.send('missing task')
    }

    const newTask = setTask(currTask)
    state.set(newTask.id, newTask)
    return res.json(newTask)
})

// put a todo
// app.put('/todos/allTodos/:todoId', (_req: Request, _res: Response) => {})

// delete a todo
// app.delete('/todos/allTodos', (_req: Request, _res: Response) => {})

app.get('/', (_req: Request, res: Response) => {
    return res.send('hello')
})

app.listen(PORT, () => console.log(`SERVER UP @ localhost:${PORT}`))