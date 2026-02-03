import { Router } from "express";
import { tutorController } from "./tutor.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.post('/', userAuth(UserRole.TUTOR), tutorController.createTutorProfile)


export const tutorRoutes = router