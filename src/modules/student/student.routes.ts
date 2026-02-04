import { Router } from "express";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";
import { studentController } from "./student.controller";

const router: Router = Router()

router.get('/',
    userAuth(UserRole.STUDENT, UserRole.ADMIN),
    studentController.getBooking)

export const studentRoutes = router