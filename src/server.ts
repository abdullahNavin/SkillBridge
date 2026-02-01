import app from "./app"
import { prisma } from "./lib/prisma"

const port = process.env.PORT || 5000

const main = async () => {
    try {
        await prisma.$connect()
        console.log('successfully connect with database');

        app.listen(port, () => {
            console.log(`skillBridge server is running on port ${port}`);
        })

    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        process.exit(1)
    }
}

main()