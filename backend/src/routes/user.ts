import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { sign } from "hono/jwt"

const userRouter= new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body= await c.req.json()
    try{
      const user= await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
      const token= await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ token }) 
    } catch(e){
      return c.json({
        error: e
      })
    }
  })
  
  
userRouter.post('/signin', async (c) => {
  const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body= await c.req.json()

  const user= await prisma.user.findFirst({
      where: {
      email: body.email,
      password: body.password
      }
  })

  try{
    //@ts-ignore
      const token= await sign({ id: user.id }, c.env.JWT_SECRET )
      return c.json({ token })   
  } catch(e){
      return c.json({
      message: "No user found with these credentials found"
      })
  }
})

export default userRouter