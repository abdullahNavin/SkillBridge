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



export const userService = {
    getUsers,
    getUserById,
    getAdminDashboardData
}


/*
const getTutorDashboardData = async (userId: string) => {

    const tutor = await prisma.tutorProfile.findUnique({
        where: { userId },
        select: { id: true }
    })

    if (!tutor) return null

    const [
        totalBookings,
        completedBookings,
        pendingBookings,
        totalReviews,
        totalEarnings
    ] = await Promise.all([
        prisma.booking.count({
            where: { tutorProfileId: tutor.id }
        }),
        prisma.booking.count({
            where: {
                tutorProfileId: tutor.id,
                status: "COMPLETED"
            }
        }),
        prisma.booking.count({
            where: {
                tutorProfileId: tutor.id,
                status: "PENDING"
            }
        }),
        prisma.review.count({
            where: { tutorProfileId: tutor.id }
        }),
        prisma.booking.aggregate({
            where: {
                tutorProfileId: tutor.id,
                status: "COMPLETED"
            },
            _sum: {
                totalFee: true
            }
        })
    ])

    return {
        totalBookings,
        completedBookings,
        pendingBookings,
        totalReviews,
        totalEarnings: totalEarnings._sum.totalFee || 0
    }
}
*/