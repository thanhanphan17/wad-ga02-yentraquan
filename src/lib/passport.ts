import Prisma from '~/dbs/init.prisma'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import AuthService from '~/services/auth.service'

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await AuthService.login({ username, password })
            if (!user) {
                return done(null, false, { message: 'username or password is incorrect' })
            }

            return done(null, {
                user
            })
        } catch (error) {
            return done(null, false)
        }
    })
)

passport.serializeUser((user: any, done) => done(null, user.user))

passport.deserializeUser(async (user: any, done) => {
    try {
        const foundUser = await Prisma.user.findUnique({ where: { username: user.user.email } })
        if (foundUser) {
            done(null, foundUser)
        }
        done(null, false)
    } catch (error) {
        done(null, false)
    }
})
