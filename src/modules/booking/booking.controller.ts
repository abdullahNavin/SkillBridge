import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Bodydata = req.body
        const { tutorProfileId, schedule_start, schedule_end } = Bodydata

        const studentId = req.user?.id as string

        const result = await bookingService.createBooking({ tutorProfileId, schedule_start, schedule_end }, studentId)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

const viewAllBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bookingService.viewAllbooking()

        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

const viewStudentBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id as string
        const result = await bookingService.viewStudentBooking(studentId)

        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const bookingController = {
    createBooking,
    viewAllBooking,
    viewStudentBooking
}