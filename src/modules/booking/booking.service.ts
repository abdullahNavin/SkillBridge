import { Booking } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createBooking = async (data: Omit<Booking, "id" | "userId">,
    studentId: string) => {

    // console.log(data, { "studentId": studentId });

    const result = await prisma.booking.create({
        data: {
            ...data,
            userId: studentId
        }
    })
    return result;
}

export const bookingService = {
    createBooking
}