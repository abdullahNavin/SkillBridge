import { Router } from "express";
import { bookingController } from "./booking.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.post('/',
    userAuth(UserRole.STUDENT, UserRole.ADMIN),
    bookingController.createBooking)

router.get('/',
    userAuth(UserRole.ADMIN),
    bookingController.viewAllBooking)

router.get('/student-bookings',
    userAuth(UserRole.STUDENT),
    bookingController.viewStudentBooking)

export const bookingRoutes = router