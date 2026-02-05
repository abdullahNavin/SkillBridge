import { NextFunction, Request, Response } from "express";
import { reviewService } from "./reviews.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const studentId = req.user?.id as string
        const result = await reviewService.createReview(data, studentId)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const reviewController = {
    createReview
}