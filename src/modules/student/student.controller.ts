import { Request, Response } from "express";
import { studentService } from "./student.service";

const getBooking = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string
        const result = await studentService.getBooking(id)
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const studentController = {
    getBooking
}