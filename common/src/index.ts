import { z } from "zod"

export const signupSchema= z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8)
})

export const signinSchema= z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const blogCreateSchema= z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional()
})

export const blogUpdateSchema= z.object({
    blog_id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
})

export type SignupSchema= z.infer<typeof signupSchema>
export type SigninSchema= z.infer<typeof signinSchema>
export type BlogCreateSchema= z.infer<typeof blogCreateSchema>
export type BlogUpdateSchema= z.infer<typeof blogUpdateSchema>


