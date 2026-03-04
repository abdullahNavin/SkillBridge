import { Router } from "express";
import { userController } from "./user.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.get('/users', userAuth(UserRole.ADMIN), userController.getUsers)

router.get('/users/admin-dashboard-data', userAuth(UserRole.ADMIN), userController.getAdminDashboardData)

router.delete('/users/:id', userAuth(UserRole.ADMIN), userController.deleteUser)

router.put('/user-update', userAuth(UserRole.STUDENT), userController.updateUser)

router.get('/users/:id',
    userAuth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
    userController.getUserById)

export const AdminGetUsersRoute = router