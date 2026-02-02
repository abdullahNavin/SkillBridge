import { NextFunction, Request, Response } from "express";
import { auth } from "../../lib/auth";
import { UserRole } from "../../types/user/userRole";
import { StatusType } from "../../types/user/statusType";

export const userAuth = (...roles: UserRole[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const session = await auth.api.getSession({
                headers: req.headers as any
            })

            if (!session || !session?.user) {
                return res.status(401).json({ message: "Unauthorized access" })
            }

            if (roles.length && !roles.includes(session?.user.role as UserRole)) {
                return res.status(403).json({ message: "Forbidden access" })
            }
            req.user = {
                id: session?.user.id,
                name: session?.user.name,
                email: session?.user.email,
                role: session?.user.role as UserRole,
                status: session?.user.status as StatusType,
                emailVerified: session?.user.emailVerified
            }

            // console.log(session);
            // console.log(req.user.role);
            next()
        }

        catch (error) {
            next(error)
        }
    }

}