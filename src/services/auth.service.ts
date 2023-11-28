import bcrypt from 'bcryptjs'
import Prisma from '~/dbs/init.prisma'

class AuthService {
    /**
     * Registers a new user.
     *
     * @param payload - The user data including name, username, and password
     * @returns An object containing the user info and tokens
     * @throws API403Error if the username already exists
     * @throws BusinessLogicError if there is an error creating the user or public key
     */
    static async register(payload: { name: string; username: string; password: string }) {
        // Check if username already exists
        const oldUser = await Prisma.user.findFirst({ where: { username: payload.username } })
        if (oldUser) {
            return {
                user: null,
                message: 'user already exists'
            }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(payload.password, 10)
        payload.password = passwordHash

        // Create user
        const newUser = await Prisma.user.create({ data: payload })
        if (!newUser) {
            return {
                user: null,
                message: 'can not create user'
            }
        }

        return {
            user: newUser,
            message: 'create user successfully'
        }
    }

    static async login(payload: { username: string; password: string }) {
        // Find the user by username
        const user = await Prisma.user.findFirst({ where: { username: payload.username } })

        // Throw an error if the user is not found
        if (!user) {
            return {
                user: null,
                message: 'user not found'
            }
        }

        // Compare the provided password with the user's password
        if (!(await bcrypt.compare(payload.password, user.password))) {
            return {
                user: null,
                message: 'username or password is incorrect'
            }
        }

        // Return user information and tokens
        return {
            user,
            message: 'login successfully'
        }
    }

    static async logout(res: any, req: any) {
        // Clear cookies
        Object.keys(req.cookies).forEach((cookieName) => {
            res.clearCookie(cookieName)
        })
        return { success: true }
    }
}

export default AuthService
