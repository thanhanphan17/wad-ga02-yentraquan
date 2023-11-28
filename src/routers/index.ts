import express, { NextFunction } from 'express'
import authController from '~/controllers/auth.controller'
import { isLoggedIn } from '~/middlewares/authentication'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})

router.get('/about-us', (req, res) => {
    res.render('about-us')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res, next: NextFunction) => {
    await authController.login(req, res, next)
})

router.get('/login-failed', (req, res) => {
    res.render('login-failed')
})

router.get('/sign-up', (req, res, next: NextFunction) => {
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
