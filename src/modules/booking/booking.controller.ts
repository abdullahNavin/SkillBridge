import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const studentId = req.user?.id as string

        const result = await bookingService.createBooking(data, studentId)
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const bookingController = {
    createBooking
}