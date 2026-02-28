import { prisma } from "../../lib/prisma"

interface BookingDataType {
    tutorImg: string;
    tutorProfileId: string;
    schedule_start: Date;
    schedule_end: Date;
    tutorQualification: string;
    tutorName: string
}

enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
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
    const result = await prisma.booking.findMany({
        where: {
            userId: studentId,

        },
        orderBy: {
            schedule_start: 'asc'
        }

    })
    return result;
}

const updateBooking = async (data: { status: BookingStatus }, BookinId: string) => {
    const result = await prisma.booking.update({
        where: {
            id: BookinId
        },
        data
    })
    return result;
}

export const bookingService = {
    createBooking,
    viewAllbooking,
    viewStudentBooking,
    updateBooking
}