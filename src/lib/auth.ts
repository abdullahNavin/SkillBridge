import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: "STUDENT"
            },
            status: {
                type: 'string',
                required: false,
                defaultValue: 'ACTIVE'
            }
        }
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [process.env.APP_URL || 'http://localhost:5000']
});