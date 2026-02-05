import { NextFunction, Request, Response } from "express"
import { categoryService } from "./category.service"

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body

        const result = await categoryService.createCategory(data)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body

        const result = await categoryService.updateCategory(data)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

const getTutorProfileBycategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id as string

        const result = await categoryService.getTutorProfileBycategoryId(categoryId)
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const categoryController = {
    createCategory,
    updateCategory,
    getTutorProfileBycategoryId
}