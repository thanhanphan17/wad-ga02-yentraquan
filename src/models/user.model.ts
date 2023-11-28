interface User {
    id: string
    username: string
    name: string
    password: string
    role: UserRole
    address?: string | null
    avartarId?: string | null
    avatar?: any | null
    status: string
    deleted: boolean
    createdAt?: Date | null
    updatedAt?: Date | null
}

type UserRole = 'user' | 'admin' | 'moderator' // Add other roles as needed

export default User
