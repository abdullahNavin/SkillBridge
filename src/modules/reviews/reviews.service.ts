import { BookingStatus, Review } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import { ReviewType } from "../../types/review/reviewType"


// {
//   tutorProfileId: '4e8c9974-283e-48b2-9c47-41dcc6809758',
//   comment: 'Great tutor! Explained concepts clearly and was very patient.',
//   rating: 5,
//   studentId: 'peXCJQ3Nxi5NcjV2U7dQ2eh1N7u1qGoA',
//   studentName: 'Abdullah Navin',
//   studentImg: null
// }


const createReview =
    async (data: ReviewType) => {
        console.log(data);
        const result = await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findFirst({
                where: {
                    tutorProfileId: data.tutorProfileId,
                    userId: data.studentId,
                    status: BookingStatus.COMPLETED

                }
            })
            console.log(booking);
            if (!booking) {
                return { message: "You can only review a tutor after completing a booking with them." }
            }

            const result = await tx.review.create({
                data: {
                    tutorProfileId: data.tutorProfileId,
                    rating: data.rating,
                    comment: data.comment,
                    userId: data.studentId,
                    studentName: data.studentName,
                    studentImg: data.studentImg
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