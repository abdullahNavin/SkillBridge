import { BookingStatus, Review } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createReview =
    async (data: Omit<Review, "id" | "userId" | "updatedAt" | "createdAt">,
        studentId: string) => {

        const result = await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findFirst({
                where: {
                    tutorProfileId: data.tutorProfileId,
                    userId: studentId,
                    status: BookingStatus.COMPLETED

                }
            })
            if (!booking) {
                return { message: "You can only review a tutor after completing a booking with them." }
            }

            const result = await tx.review.create({
                data: {
                    ...data,
                    userId: studentId
                }
            })
            const stats = await tx.review.aggregate({
                where: {
                    tutorProfileId: data.tutorProfileId
                },
                _avg: { rating: true },
                _count: true
            });
            const updateTutor = await tx.tutorProfile.update({
                where: {
                    id: data.tutorProfileId
                },
                data: {
                    rating: stats._avg.rating,
                    totalReviews: stats._count
                }
            })
            return result;
        })
        return result;
    }

export const reviewService = {
    createReview
}