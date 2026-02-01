import express, { Application } from 'express'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('skillbridge server is runing')
})

app.all('/api/auth/*splat', toNodeHandler(auth));

export default app