import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"

const blogRouter= new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string
    }, Variables: {
        userId: string
    }
}>()

blogRouter.use(async (c, next)=>{
    const authToken= c.req.header('authorization')
    if (!authToken){
      return c.json({
        message: "You are not authenticated to be on this page"
      })
    }
  
    const token= authToken.split(' ')[1]
    const decodedPayload= await verify(token, c.env.JWT_SECRET)
    if (!decodedPayload){
      return c.json({
        message: "You're not authenticated"
      })
    }
    c.set('userId', decodedPayload.id)
    await next()
  })
  

blogRouter.post('/', async (c)=>{
    const userId= c.get('userId')
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body= await c.req.json()
    const blog= await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        message: `Your blog with title ${blog.title} and blog id ${blog.id} has been created successfully`
    })
})

blogRouter.put('/', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body= await c.req.json()

    const updatedPost= await prisma.post.update({
        where: {
            id: body.id,
            authorId: body.authorId
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        message: "Your post was updated successfully"
    })
})

blogRouter.get('/:id', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const param= c.req.param('id')

    try{
        const blog= await prisma.post.findUnique({
            where: {
                id: param
            }
        })

        return c.json({
            blog
        })
    } catch(e){
        return c.json({
            message: "Blog not found"
        })
    }
        

})

blogRouter.get('/', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const data= await prisma.post.findMany()

    return c.json({
        data
    })
})

export default blogRouter