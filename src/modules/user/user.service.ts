import { prisma } from "../../lib/prisma"
import { ReqUserT } from "../../types/user/reqUserTypes"
import { UserRole } from "../../types/user/userRole"
import { userController } from "./user.controller"

const getUsers = async () => {
    const result = await prisma.user.findMany()
    return result
}

const getUserById = async (id: string, user: ReqUserT) => {

    if (user.role === UserRole.STUDENT || user.role === UserRole.TUTOR) {
        if (id !== user.id) {
            return { message: 'access denied' }
        }
    }

    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return result;
}

export const userService = {
    getUsers,
    getUserById
}