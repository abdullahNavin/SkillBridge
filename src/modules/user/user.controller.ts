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

export const userController = {
    getUsers
}