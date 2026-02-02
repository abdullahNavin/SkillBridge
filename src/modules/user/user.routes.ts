import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router()

router.get('/users', userController.getUsers)

export const AdminGetUsersRoute = router