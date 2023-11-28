import express, { NextFunction } from 'express'
import authController from '~/controllers/auth.controller'
import { isLoggedIn } from '~/middlewares/authentication'
import User from '~/models/user.model'

const router = express.Router()

router.get('/', (req, res) => {
    const user = req.user as User
    res.render('login', { user })
})

router.get('/profile', isLoggedIn, (req, res) => {
    const user = req.user as User
    res.render('profile', { user })
})

router.get('/success', (req, res) => {
    const user = req.user as User
    res.render('successRegister')
})

router.get('/about-us', (req, res) => {
    const user = req.user as User
    res.render('about-us', { user })
})

router.get('/login', (req, res) => {
    const user = req.user as User
    res.render('login')
})

router.post('/login', async (req, res, next: NextFunction) => {
    await authController.login(req, res, next)
})

router.get('/login-failed', (req, res) => {
    res.render('login-failed')
})

router.get('/sign-up', (req, res, next: NextFunction) => {
    const user = req.user as User
    res.render('signup')
})

router.post('/sign-up', async (req, res, next: NextFunction) => {
    const result = await authController.register(req, res, next)
    console.log(result)
})

router.get('/logout', authController.logout)

router.get('/unauthorized', (req, res) => {
    res.render('404')
})

export default router
