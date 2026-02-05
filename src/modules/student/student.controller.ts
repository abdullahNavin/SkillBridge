import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";

const getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id as string
        const result = await studentService.getBooking(id)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const studentController = {
    getBooking
}