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
    .put('/todos/update/:todoId', (req: Request, res: Response) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(id.length === 0 || !id)
            return res.send('please provide id')

        const item = state.get(id)
        const task = body.task || item?.task
        const completed = body.completed || item?.completed

        const newTask = setTask({ ...item, task, completed })
        state.set(id, newTask)
        return res.json(newTask)
    })
// delete a todo
// todo.delete('/todos/allTodos', (_req: Request, _res: Response) => {})

// MAYBE HAVE ONE FOR COMPLETED

export default Todo