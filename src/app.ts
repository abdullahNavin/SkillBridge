import express, { Application } from 'express'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { AdminGetUsersRoute } from './modules/user/user.routes';
import { tutorRoutes } from './modules/tutor/tutor.routes';

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('skillbridge server is runing')
})

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use('/api/admin', AdminGetUsersRoute)

app.use('/tutor/profile', tutorRoutes)

export default app