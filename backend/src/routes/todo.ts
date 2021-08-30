import { Router, Request, Response, NextFunction } from 'express'
// import { setTask } from '../utils'
import httpErrors from 'http-errors'
import { ITodo } from '../models/TodoModel'
import { errorMessages as errMsg,
    // infoMessages as infMsg
} from '../constants/messages'
import TodoServices from '../services/TodoServices'

const todo = Router()
    .get('/todos', async (_req: Request, res: Response) => {
        const todos = await TodoServices.getAll()
        return res.json(todos)
    })

    .post('/todos/add', async (req: Request, res: Response, next: NextFunction) => {
        const currTask = <ITodo>req.body

        if(!currTask.task)
            return next(httpErrors(400, errMsg.httpErrors.missingTask))

        const newTodo = await TodoServices.create({ task: currTask.task })
        res.status(201)
        return res.json(newTodo)
    })

    .put('/todos/update/:todoId', async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(!id)
            return next(httpErrors(400, errMsg.httpErrors.idNotAvailable))

        if(!body.task && !body.completed)
            return next(httpErrors(400, errMsg.httpErrors.nothingToModify.replace('$1', id)))

        const newTodo = await TodoServices.update(id, body)

        if(!newTodo)
            return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))

        console.log(newTodo)
        return res.json(newTodo)
    })

    // .delete('/todos/remove/:todoId', (req: Request, res: Response, next: NextFunction) => {
    //     const id = req.params.todoId

    //     if(id.length === 0 || !id)
    //         return next(httpErrors(400, errMsg.httpErrors.idNotAvailable))

    //     if(!state.has(id))
    //         return next(httpErrors(404, errMsg.httpErrors.todoDoesNotExist))

    //     state.delete(id)
    //     return res.send({ message: infMsg.todos.deleted })
    // })

export default todo
