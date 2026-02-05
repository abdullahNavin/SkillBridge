import { Request, Response, NextFunction } from "express"
import { Prisma } from "../../generated/prisma/client"


const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500
    let message = "Internal server error"

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400
        message = "Invalid data provided"
    }

    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400

        switch (err.code) {
            case "P2002":
                message = "Duplicate field value already exists"
                break
            case "P2025":
                message = "Requested record not found"
                break
            default:
                message = "Database request error"
        }
    }

    else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500
        message = "Database service unavailable"
    }

    else if (err instanceof Error) {
        message = err.message
    }

    res.status(statusCode)
    res.json({
        success: false,
        message: message,
        error: err
    })
}

export default errorHandler
