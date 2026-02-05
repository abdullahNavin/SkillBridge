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


const getAllTutors = async (payload: searchQuery) => {
    const { search, rating, price } = payload
    const lowerCaseSub = search.toLocaleLowerCase()

    const where: any = {}
    if (search?.trim()) {
        where.subjects = {
            has: lowerCaseSub
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

    return result
}

// TODO:update tutor profile and query for category
// TODO:in bookin calculate totall price

export const tutorService = {
    createTutorProfile,
    getTutorProfile,
    getTutorDashboardData,
    getAllTutors
}