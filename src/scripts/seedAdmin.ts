import { prisma } from "../lib/prisma"
import { UserRole } from "../types/user/userRole"

const seedAdmin = async () => {
    try {
        const userDetails = {
            name: "Admin User",
            email: "admin@skillbridge.com",
            password: "Admin@12345",
            role: UserRole.ADMIN
        }

        const isUserExists = await prisma.user.findUnique({
            where: {
                email: userDetails.email
            }
        })

        if (isUserExists) {
            throw new Error("This admin user already exists.")
        }

        const signupUser = await fetch('http://localhost:5000/api/auth/sign-up/email', {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "origin": `${process.env.APP_URL}`
            },
            body: JSON.stringify(userDetails)
        })

        if (signupUser.ok) {
            const result = await prisma.user.update({
                where: {
                    email: userDetails.email
                },
                data: {
                    emailVerified: true
                }
            })
        }
    } catch (error: any) {
        console.log(error.message);
    }
}

seedAdmin()