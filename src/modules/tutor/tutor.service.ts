import { TutorProfile } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import { searchQuery } from "../../types/tutor/searchQuery"

const createTutorProfile = async (
    data: Omit<TutorProfile, "id" | "userId" | "rating">,
    authorId: string) => {
    const lowerCaseSub = data.subjects.map(sub => sub.toLowerCase())

    console.log(lowerCaseSub);
    data.subjects = lowerCaseSub
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

// TODO: set name in tutorp schema
const getAllTutors = async (payload: searchQuery) => {
    const { search, rating, price } = payload
    const where: any = {}
    if (search) {
        where.subjects = {
            has: search
        }
    }
    if (!isNaN(rating)) {
        where.rating = {
            gte: rating
        }
    }
    if (!isNaN(price)) {
        where.hourlyRate = {
            lte: price
        }
    }
    const result = await prisma.tutorProfile.findMany({
        where,
        orderBy: {
            hourlyRate: "asc"
        }
    })

    //     const result = await prisma.$queryRaw`
    //   SELECT *
    //   FROM "TutorProfile"
    //   WHERE EXISTS (
    //     SELECT 1
    //     FROM unnest("subjects") s
    //     WHERE LOWER(s) LIKE LOWER(${`%${search}%`})
    //   )
    //   AND (${rating} IS NULL OR rating >= ${rating})
    //   AND (${price} IS NULL OR "hourlyRate" <= ${price})
    //   ORDER BY "hourlyRate" ASC
    // `

    return result
}

export const tutorService = {
    createTutorProfile,
    getTutorProfile,
    getTutorDashboardData,
    getAllTutors
}