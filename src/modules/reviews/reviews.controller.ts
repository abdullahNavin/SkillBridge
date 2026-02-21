import { NextFunction, Request, Response } from "express";
import { reviewService } from "./reviews.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const studentId = req.user?.id as string
        const studentName = req.user?.name as string
        const studentImg = req.user?.image as string | null

        const result = await reviewService.createReview(data, studentId, studentName, studentImg)

        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const reviewController = {
    createReview
}