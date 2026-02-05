import { prisma } from "../../lib/prisma"

interface BookingDataType {
    tutorProfileId: string;
    schedule_start: Date;
    schedule_end: Date;
}

const createBooking = async (data: BookingDataType,
    studentId: string) => {

    const result = await prisma.$transaction(async (tx) => {

        const hourlyRate = await tx.tutorProfile.findUnique({
            where: {
                id: data.tutorProfileId
            },
            select: { hourlyRate: true }
        })

        const start = new Date(data.schedule_start)
        const end = new Date(data.schedule_end)

        const durationInHours =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60)

        // console.log(durationInHours);

        const totalFee = durationInHours * Number(hourlyRate?.hourlyRate)
        // console.log(totalFee);

        const result = await tx.booking.create({
            data: {
                ...data,
                userId: studentId,
                totalFee
            }
        })
        return result;
    })

    return result;
}

const viewAllbooking = async () => {
    const result = await prisma.booking.findMany()
    return result
}

const viewStudentBooking = async (studentId: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: studentId
        },
        include: {
            bookings: true
        }
    })
    return result;
}

export const bookingService = {
    createBooking,
    viewAllbooking,
    viewStudentBooking
}