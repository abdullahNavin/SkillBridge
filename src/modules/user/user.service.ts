import { BookingStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ReqUserT } from "../../types/user/reqUserTypes"
import { UserRole } from "../../types/user/userRole"

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

const getAdminDashboardData = async () => {
    const [totalBookings,
        totalStudent,
        totalTutor,
        totalCompletedSession,
        totalEarnings] = await Promise.all([
            prisma.booking.aggregate({
                _count: { tutorProfileId: true }
            }),
            prisma.user.count({
                where: {
                    role: UserRole.STUDENT
                }
            }),
            prisma.user.count({
                where: {
                    role: UserRole.TUTOR
                }
            }),
            prisma.booking.count({
                where: {
                    status: BookingStatus.COMPLETED
                }
            }),
            prisma.booking.aggregate({
                _sum: { totalFee: true }
            })

        ])
    return {
        totalBookings,
        totalStudent,
        totalTutor,
        totalCompletedSession,
        totalEarnings
    }
}

const deleteUser = async (id: string) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result
}



export const userService = {
    getUsers,
    getUserById,
    getAdminDashboardData,
    deleteUser

}

