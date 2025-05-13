import * as z from 'zod';

export const signUpSchema = z.object({
  email: z.string().min(1,{message:"Email is required"}).email({message:"Invalid email format"}),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string().min(1,{message:"Confirm password is required"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})