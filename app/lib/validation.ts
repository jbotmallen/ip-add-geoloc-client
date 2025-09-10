import z from "zod";
import { isValidEmail, validateIP } from "./utils";

export const loginSchema = z.object({
    email: z.email('Invalid email address').min(1, 'Email is required').max(255, 'Email is too long').refine((email) => isValidEmail(email), {
        message: 'Invalid email format',
        path: ['email'],
    }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    email: z.email('Invalid email address').min(1, 'Email is required').max(255, 'Email is too long').refine((email) => isValidEmail(email), {
        message: 'Invalid email format',
        path: ['email'],
    }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const searchIp = z.object({
    ip: z.string().min(7, 'IP address is required').max(45, 'IP address is too long'),
}).refine((ip) => {
    return validateIP(ip.ip);
}, { message: 'Invalid IP address format', path: ['ip'] });

export const searchHistory = z.object({
    ip: z.string().min(7, 'IP address is required').max(45, 'IP address is too long'),
    timestamp: z.date().default(() => new Date()),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SearchIpFormValues = z.infer<typeof searchIp>;