import express from 'express'
import { isLoggedIn } from '~/middlewares/authentication'

const router = express.Router()

router.get('/', isLoggedIn, (req, res) => {
    res.send('Hello World!')
})

export default router
