import { NextFunction } from 'express'

export const isLoggedIn = (req: any, res: any, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/unauthorized')
}
