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
    userAuth(UserRole.STUDENT, UserRole.ADMIN),
    bookingController.viewStudentBooking)

router.put('/update-bookings/:bookingId',
    userAuth(UserRole.TUTOR),
    bookingController.updateBooking)

export const bookingRoutes = router