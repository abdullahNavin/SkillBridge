import { Request, Response } from "express"
import { categoryService } from "./category.service"

const createCategory = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const result = await categoryService.createCategory(data)
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const result = await categoryService.updateCategory(data)
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const categoryController = {
    createCategory,
    updateCategory
}