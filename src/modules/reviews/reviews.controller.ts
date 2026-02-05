import { Request, Response } from "express";
import { reviewService } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const studentId = req.user?.id as string
        const result = await reviewService.createReview(data, studentId)
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const reviewController = {
    createReview
}