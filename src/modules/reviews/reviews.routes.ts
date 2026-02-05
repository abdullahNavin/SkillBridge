import { Router } from "express";
import { reviewController } from "./reviews.controller";
import { userAuth } from "../../middleware/Auth/userAuth";
import { UserRole } from "../../types/user/userRole";

const router: Router = Router()

router.post('/',
    userAuth(UserRole.ADMIN, UserRole.STUDENT),
    reviewController.createReview)

export const reviewRoutes = router