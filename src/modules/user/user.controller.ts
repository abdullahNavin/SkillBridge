import { Request, Response } from "express";
import { userService } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUsers()
        res.status(200).json(result)
    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        if (!req.user) {
            return res.status(404).json({ message: 'please sign in' })
        }

        const result = await userService.getUserById(id, req.user)
        res.status(200).json(result)

    } catch (error: any) {
        return res.status(500).json({ message: 'server side error', error: error.message })
    }
}

export const userController = {
    getUsers,
    getUserById
}