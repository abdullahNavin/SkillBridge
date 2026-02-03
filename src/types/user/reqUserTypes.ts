import { StatusType } from "./statusType"
import { UserRole } from "./userRole"

export interface ReqUserT {
    id: string
    name: string | null
    email: string
    role: UserRole
    status: StatusType
    emailVerified: boolean | null
}