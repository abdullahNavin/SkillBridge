import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

// TODO: UPDATE profile
const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const addname = req.user?.name as string
        data.name = addname
        const addImage = req.user?.image as string
        data.image = addImage

        const userId = req.user?.id as string

        const { name, category_id, bio, image, yearsOfExperience, hourlyRate, qualifications, availability, subjects } = data

        const result = await tutorService.createTutorProfile({ name, category_id, bio, image, yearsOfExperience, hourlyRate, qualifications, availability, subjects }, userId)
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
        const search = req.query.search as string
        const rating = Number(req.query.rating)
        const price = Number(req.query.price)
        // console.log(req.user?.role);
        const payload = {
            search,
            rating,
            price
        }
        const result = await tutorService.getAllTutors(payload)

        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

const updateTutorProfile = async (req: Request, res: Response) => {
    try {
        // const id = req.user?.id as string
        const data = req.body
        const { name, category_id, bio, image, yearsOfExperience, hourlyRate, qualifications, availability, subjects } = data

        const authorId = req.user?.id as string

        const result = await tutorService.updateTutorProfile({ name, category_id, bio, image, yearsOfExperience, hourlyRate, qualifications, availability, subjects }, authorId)

        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const tutorController = {
    createTutorProfile,
    getTutorProfile,
    getTutorDashboardData,
    getAllTutors,
    updateTutorProfile
}