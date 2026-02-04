import { Router } from "express";
import { tutorController } from "./tutor.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.post('/profile', userAuth(UserRole.TUTOR), tutorController.createTutorProfile)

router.get('/dashboard', userAuth(UserRole.TUTOR), tutorController.getTutorDashboardData)

router.get('/profile/:id', tutorController.getTutorProfile)

router.get('/', tutorController.getAllTutors)


export const tutorRoutes = router