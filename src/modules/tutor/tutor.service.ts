import { TutorProfile } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createTutorProfile = async (
    data: Omit<TutorProfile, "id" | "userId">,
    authorId: string) => {

    const result = await prisma.tutorProfile.create({
        data: {
            ...data,
            userId: authorId
        }
    })
    return result;
}

export const tutorService = {
    createTutorProfile
}