import { Router, Request, Response, NextFunction } from 'express'
import { setTask } from '../utils'
import httpErrors from 'http-errors'
import { errorMessages as errMsg, infoMessages as infMsg } from '../constants/messages'

export interface ITodo {
    id: string;
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number;
}

export type TState = Map<string, ITodo>

const state: TState = new Map()

const todo = Router()
    .get('/todos', (_req: Request, res: Response) => {
        return res.json([...state].map((val) => val[1]))
    })

    .post('/todos/add', (req: Request, res: Response, next: NextFunction) => {
        const currTask = <ITodo>req.body

        if(!currTask.task)
            return next(httpErrors(400, errMsg.httpErrors.missingTask))

        const newTask = setTask(currTask)
        state.set(newTask.id, newTask)
        return res.json(newTask)
    })

    .put('/todos/update/:todoId', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(id.length === 0 || !id)
            return next(httpErrors(400, errMsg.httpErrors.idNotAvailable))

        if(!state.has(id))
            return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))

        if(!body.task && !body.completed)
            return next(httpErrors(400, errMsg.httpErrors.nothingToModify.replace('$1', id)))

        const item = state.get(id)
        const task = body.task || item?.task
        const completed = body.completed || item?.completed

        const newTask = setTask({ ...item, task, completed })
        state.set(id, newTask)

        return res.json(newTask)
    })

    .delete('/todos/remove/:todoId', (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId

        if(id.length === 0 || !id)
            return next(httpErrors(400, errMsg.httpErrors.idNotAvailable))

        if(!state.has(id))
            return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))

        state.delete(id)
        return res.send({ message: infMsg.todos.deleted })
    })

export default todo
