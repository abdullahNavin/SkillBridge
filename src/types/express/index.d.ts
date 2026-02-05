
import 'express';
import { UserRole } from '../user/userRole';
import { StatusType } from '../user/statusType';


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                name: string | null
                image: string | null | undefined
                email: string
                role: UserRole
                status: StatusType
                emailVerified: boolean | null
            }
        }
    }
}