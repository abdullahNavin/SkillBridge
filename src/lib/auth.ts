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
    socialProviders: {
        google: {
            prompt: 'select_account consent',
            accessType: 'offline',
            clientId: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || ''
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        // requireEmailVerification:true
    },
    trustedOrigins: [process.env.APP_URL || 'http://localhost:5000']
});