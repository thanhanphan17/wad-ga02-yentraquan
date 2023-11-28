import { NextFunction } from 'express'
import passport from 'passport'
import authService from '~/services/auth.service'
class AuthController {
    authenticate = passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login-failed'
    })

    register = async (req: any, res: Response, next: NextFunction) => {
        const response = await authService.register(req.body)
        if (!response.user) {
            return {
                success: false,
                message: response.message
            }
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
}

export default new AuthController()
