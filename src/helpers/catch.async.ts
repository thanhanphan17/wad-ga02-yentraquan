import { Request, Response, NextFunction } from 'express'

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction): Promise<any> => {
        return Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
