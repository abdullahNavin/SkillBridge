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

const getTutorProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await tutorService.getTutorProfile(id)

        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

const getTutorDashboardData = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string

        const result = await tutorService.getTutorDashboardData(id)

        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

const getAllTutors = async (req: Request, res: Response) => {
    try {
        const result = await tutorService.getAllTutors()

        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}


export const tutorController = {
    createTutorProfile,
    getTutorProfile,
    getTutorDashboardData,
    getAllTutors
}