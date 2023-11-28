import express from 'express'
import router from '~/routers'
import bodyParser from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'

import { create } from 'express-handlebars'

import '~/dbs/init.prisma'
import '~/lib/passport'

import session from 'express-session'
import passport from 'passport'

const app = express()

// Configure the template engine to use Handlebars
app.engine('hbs', create({ extname: '.hbs', defaultLayout: false, layoutsDir: 'views/' }).engine)
// Set the default view engine to Handlebars
app.set('view engine', 'hbs')

// Set the directory where views are located
app.set('views', 'src/views')

// Init middlewares
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'secret',
        cookie: {
            maxAge: 1000 * 100
        },
        store: new session.MemoryStore()
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

// init routes
app.use('/', router)

export default app
