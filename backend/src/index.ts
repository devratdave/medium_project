import userRouter from './routes/user'
import blogRouter from './routes/blog'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }, 
  Variables: {
    prisma: PrismaClient
  }
}>()
app.use('/*', cors())

app.route('api/v1/user', userRouter)
app.route('api/v1/blog', blogRouter)


export default app
