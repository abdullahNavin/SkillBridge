import { prisma } from "../../lib/prisma"

const getBooking = async (id: string) => {
    const result = await prisma.booking.findMany({
        where: {
            userId: id
        }
    })
    return result;
}

export const studentService = {
    getBooking
}