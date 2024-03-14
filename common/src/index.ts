import zod, { string } from 'zod';

export const SignUpInput = zod.object({
firstName: string().trim().min(1),
    lastName: string().trim().min(1),
    email: string().trim(),
    password: string().trim().min(8)
})

export const SignInInput = zod.object({
    email: string().trim(),
    password: string().trim().min(8)
})

export const UpdateBlogInput = zod.object({
    title: string(),
    content: string(),
    userId: string()
})
export const CreateBlogInput  = zod.object({
    title: string(),
    content: string(),
    
})

export type SignInSchema = zod.infer<typeof SignInInput>
export type SignUpSchema = zod.infer<typeof SignUpInput>
export type UpdateBlogSchema = zod.infer<typeof UpdateBlogInput>
export type CreateBlogSchema = zod.infer<typeof CreateBlogInput>