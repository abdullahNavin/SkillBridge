import express, { Application } from 'express'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { AdminGetUsersRoute } from './modules/user/user.routes';
import { tutorRoutes } from './modules/tutor/tutor.routes';
import { categoryRoutes } from './modules/category/category.routes';
import { bookingRoutes } from './modules/booking/booking.routes';
import { studentRoutes } from './modules/student/student.routes';
import { reviewRoutes } from './modules/reviews/reviews.routes';

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('skillbridge server is runing')
})

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use('/api/admin', AdminGetUsersRoute)

app.use('/tutor', tutorRoutes)
app.use('/category', categoryRoutes)
app.use('/booking', bookingRoutes)
app.use('/student', studentRoutes)
app.use('/review', reviewRoutes)

export default app