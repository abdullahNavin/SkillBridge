import { TutorProfile } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createTutorProfile = async (
    data: Omit<TutorProfile, "id" | "userId" | "rating">,
    authorId: string) => {
    const isProfileExist = await prisma.tutorProfile.findUnique({
        where: {
            userId: authorId
        }
    })

    if (isProfileExist) {
        return { message: 'Your tutor profile already exist' }
    }

    const result = await prisma.tutorProfile.create({
        data: {
            ...data,
            userId: authorId
        }
    })
    return result;
}
// TODO reating , review, booking
const getTutorProfile = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            userId: id
        },
        include: {
            bookings: true,
            reviews: true
        }
    })
    return result;
}
// TODO
const getTutorDashboardData = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            userId: id
        },
        include: {
            bookings: true,
            reviews: true
        }
    })
    return result;
}

// TODO: Search functionality impliment
const getAllTutors = async () => {
    const result = await prisma.tutorProfile.findMany()
    return result
}

export const tutorService = {
    createTutorProfile,
    getTutorProfile,
    getTutorDashboardData,
    getAllTutors
}