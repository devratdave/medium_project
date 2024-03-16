import userRouter from './routes/user'
import blogRouter from './routes/blog'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.route('api/v1/user', userRouter)
app.route('api/v1/blog', blogRouter)

export default app
