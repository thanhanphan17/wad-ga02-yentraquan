import express, { NextFunction } from 'express'
import authController from '~/controllers/auth.controller'
import { isLoggedIn } from '~/middlewares/authentication'

const router = express.Router()

router.get('/', (req, res) => {
    // call controller
    res.render('login')
})

router.post('/login', async (req, res, next: NextFunction) => {
    // call controller
    const result = await authController.login(req, res, next)
    console.log(result)
})

router.get('/sign-up', (req, res, next: NextFunction) => {
    // call controller
    res.render('signup')
})

router.post('/sign-up', async (req, res, next: NextFunction) => {
    // call controller
    const result = await authController.register(req, res, next)
    console.log(result)
})

router.get('/profile', isLoggedIn, (req, res) => {})

export default router
