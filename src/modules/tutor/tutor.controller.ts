import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const userId = req.user?.id as string
        const result = await tutorService.createTutorProfile(data, userId)
        res.status(200).json(result)
    }
    catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const tutorController = {
    createTutorProfile
}