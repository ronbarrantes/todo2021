import { Router, Request, Response } from 'express'
import { setTask } from '../utils'

export interface ITodo {
    id: string;
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number
}

const state: Map<string, ITodo> = new Map()

const Todo = Router()

    .get('/todos/allTodos', (_req: Request, res: Response) => {
        return res.json([...state].map((val) => val[1]))
    })

    .post('/todos/addTodo', (req: Request, res: Response) => {
        const currTask = <ITodo>req.body
        if(!currTask.task){
            return res.send('missing task')
        }

        const newTask = setTask(currTask)
        state.set(newTask.id, newTask)
        return res.json(newTask)
    })
// put a todo
// todo.put('/todos/allTodos/:todoId', (_req: Request, _res: Response) => {})

// delete a todo
// todo.delete('/todos/allTodos', (_req: Request, _res: Response) => {})

export default Todo