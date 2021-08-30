import { Request, Response, NextFunction } from 'express'

export const sanitizeBody = (req: Request, _res: Response, next: NextFunction): any => {
    if(req.body._id)
        delete req.body._id

    next()
}