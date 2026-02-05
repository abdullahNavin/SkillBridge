import { Router } from "express";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";
import { categoryController } from "./category.controller";

const router: Router = Router()

router.post('/', userAuth(UserRole.ADMIN), categoryController.createCategory)
router.patch('/', userAuth(UserRole.ADMIN), categoryController.updateCategory)

export const categoryRoutes = router