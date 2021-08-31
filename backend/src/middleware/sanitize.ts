import { Request, Response, NextFunction } from 'express'
import { ITodo } from '../models/TodoModel'

export const sanitizeBody = (req: Request, _res: Response, next: NextFunction): void => {
    const body: ITodo = req.body

    if(body._id)
        delete body._id

    if(body.createdAt)
        delete body.createdAt

    req.body = body
    return next()
}