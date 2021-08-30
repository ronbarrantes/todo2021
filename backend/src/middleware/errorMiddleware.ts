import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

// TODO: figure out what to add as a return type
export const errorMiddleware = (err: HttpError, _req: Request, res: Response, next: NextFunction): any => {
    console.error(err)

    if(err.status)
        return res.sendStatus(err.status)

    const message = err.message.toLowerCase()

    if(message.includes('objectid failed'))
        return res.sendStatus(404)

    if(message.includes('validation failed'))
        return res.sendStatus(400)

    if(message.includes('duplicate key'))
        return res.sendStatus(409)

    if(message.includes('unauthorized'))
        return res.sendStatus(401)

    res.sendStatus(500)
    return next()
}