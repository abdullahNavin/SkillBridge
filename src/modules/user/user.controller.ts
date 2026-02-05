import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getUsers()
        res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        if (!req.user) {
            return res.status(404).json({ message: 'please sign in' })
        }

        const result = await userService.getUserById(id, req.user)
        res.status(200).json(result)

    } catch (error: any) {
        next(error)
    }
}

export const userController = {
    getUsers,
    getUserById
}