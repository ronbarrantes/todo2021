import { Router, Request, Response, NextFunction } from 'express'
import { setTask } from '../utils'
import httpErrors from 'http-errors'

export interface ITodo {
    id: string;
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number;
}

export type TState = Map<string, ITodo>

const state: TState = new Map()

const Todo = Router()
    .get('/todos', (_req: Request, res: Response) => {
        return res.json([...state].map((val) => val[1]))
    })

    .post('/todos/add', (req: Request, res: Response, next: NextFunction) => {
        const currTask = <ITodo>req.body

        if(!currTask.task)
            return next(httpErrors(400, 'Missing task'))

        const newTask = setTask(currTask)
        state.set(newTask.id, newTask)
        return res.json(newTask)
    })

    .put('/todos/update/:todoId', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(id.length === 0 || !id)
            return next(httpErrors(400, 'ID not available'))

        if(!state.has(id))
            return next(httpErrors(404, 'Todo does not exist'))

        if(!body.task && !body.completed)
            return next(httpErrors(400, `Nothing to modify for todo with id of ${id}`))

        const item = state.get(id)
        const task = body.task || item?.task
        const completed = body.completed || item?.completed

        const newTask = setTask({ ...item, task, completed })
        state.set(id, newTask)
        return res.json(newTask)
    })

    .delete('/todos/remove/:todoId', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId

        if(id.length === 0 || !id){
            return next(httpErrors(400, 'ID not available'))
        }

        if(!state.has(id)){
            res.send('No Id provided')
            return next(httpErrors(404, 'Todo does not exist'))
        }

        state.delete(id)
        return res.send({ message: 'Todo deleted' })
    })

export default Todo