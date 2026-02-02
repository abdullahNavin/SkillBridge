import { Router } from "express";
import { userController } from "./user.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.get('/users', userAuth(UserRole.STUDENT), userController.getUsers)

export const AdminGetUsersRoute = router