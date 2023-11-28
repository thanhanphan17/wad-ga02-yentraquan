import { NextFunction } from 'express'
import passport from 'passport'
import authService from '~/services/auth.service'

class AuthController {
    login = passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login-failed'
    })

    register = async (req: any, res: any, next: NextFunction) => {
        const response = await authService.register(req.body)
        if (!response.user) {
            res.redirect('/signup-failed')
            return {
                success: false,
                message: response.message
            }
        } else {
            res.redirect('/success')
        }
        return {
            success: true,
            message: response.message
        }
    }

    profile = (req: any, res: Response, next: NextFunction) => {
        return {
            user: req.user
        }
    }

    logout = (req: any, res: any) => {
        req.session.destroy()
        res.redirect('/')
    }
}

export default new AuthController()
