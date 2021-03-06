import { Router, Request, Response, NextFunction } from 'express'
import httpErrors from 'http-errors'
import { ITodo } from '../models/TodoModel'
import { errorMessages as errMsg } from '../constants/messages'
import TodoServices from '../services/TodoServices'
import { sanitizeBody } from '../middleware/sanitize'

const todo = Router()
    .get('/todos', async (_req: Request, res: Response) => {
        const todos = await TodoServices.getAll()
        return res.json(todos)
    })

    .post('/todos/add', sanitizeBody, async (req: Request, res: Response, next: NextFunction) => {
        const currTask = <ITodo>req.body

        if(!currTask.task)
            return next(httpErrors(400, errMsg.httpErrors.missingTask))

        const newTodo = await TodoServices.create({ task: currTask.task })
        res.status(201)
        return res.json(newTodo)
    })

    .put('/todos/update/:todoId', sanitizeBody, async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(!body.task && !body.completed)
            return next(httpErrors(400, errMsg.httpErrors.nothingToModify.replace('$1', id)))

        const newTodo = await TodoServices.update(id, body)

        if(!newTodo)
            return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))

        return res.json(newTodo)
    })

    .delete('/todos/remove/:todoId', async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId

        let deletedTodo: ITodo | null
        try {
            deletedTodo = await TodoServices.remove(id)
        } catch (error) {
            console.error(error)
            return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))
        }

        return res.send(deletedTodo)
    })

export default todo
