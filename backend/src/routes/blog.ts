import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"
import { blogCreateSchema, blogUpdateSchema } from "@devratdave/common"

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
        c.status(401)
      return c.json({
        message: "You are not authenticated to be on this page"
      })
    }
  
    const token= authToken.split(' ')[1]
    try{
        const decodedPayload= await verify(token, c.env.JWT_SECRET)
        if (!decodedPayload){
            return c.json({
                message: "You're not authenticated"
            })
        }
        c.set('userId', decodedPayload.id)
        await next()
    }catch(e){
        c.status(401)
        return c.json({
            message: "You are not authenticated to be on this page"
        })
    }
  })
  

blogRouter.post('/', async (c)=>{
    const userId= c.get('userId')
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body= await c.req.json()
    if(!blogCreateSchema.safeParse(body).success){
        c.status(400)
        return c.json({
            message: "Invalid Inputs"
        })
    }
    const blog= await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        message: `Your blog with title "${blog.title}" has been created successfully`
    })
})

blogRouter.put('/:id', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id= c.req.param('id')

    const body= await c.req.json()
    console.log(body)
    if(!blogUpdateSchema.safeParse(body).success){
        c.status(400)
        return c.json({
            message: "Invalid Inputs"
        })
    }
    try{
        await prisma.post.update({
            where: {
                id,
                authorId: c.get("userId")
            }, 
            data: {
                title: body.title,
                content: body.content
            }
        })
    
        return c.json({
            message: "Your post was updated successfully"
        })
    } catch(e){
       c.status(400)
       return c.json({
        message: "You are updating someone else's blog, please update your own blog."
       })
    }
})

blogRouter.get('/user', async (c)=>{
    const id= c.get('userId')
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const userBlogs= await prisma.post.findMany({
            where: {
                authorId: id
            },
            select: {
                id: true,
                title: true,
                content: true,
            }
        })
        return c.json({
            blogs: userBlogs
        })
    }catch(e){
        return c.json({
            e
        })
    }


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
            }, 
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
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

    const data= await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        data
    })
})



export default blogRouter