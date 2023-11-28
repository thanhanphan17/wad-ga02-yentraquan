import { Response } from 'express'
import Prisma from '~/dbs/init.prisma'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import AuthService from '~/services/auth.service'

passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log('LocalStrategy:::', username, password)
        try {
            const response = await AuthService.login({ username, password })
            if (!response.user) {
                return done(null, false, { message: response.message })
            }

            return done(null, {
                user: response.user
            })
        } catch (error) {
            return done(null, false)
        }
    })
)

passport.serializeUser((user: any, done) => done(null, user.user))

passport.deserializeUser(async (user: any, done) => {
    console.log('DeserializeUser', user)
    done(null, user)
})
