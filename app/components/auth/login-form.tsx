import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EyeIcon, EyeOffIcon, Loader2, Loader2Icon, SendIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginSchema, type LoginFormValues } from '@/lib/validation';

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            await login(data.email, data.password);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full px-4">
            <CardHeader className='text-center'>
                <CardTitle className="text-xl font-bold">Login to your account</CardTitle>
                <CardDescription className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder={showPassword ? "Your password is visible" : "••••••••"}
                                                {...field}
                                                disabled={isLoading}
                                            />
                                            <Button size="icon" variant="outline" className="absolute right-0 top-0" onClick={() => setShowPassword(!showPassword)} type="button">
                                                {showPassword ? <EyeIcon className="size-4 rotate-180" /> : <EyeOffIcon className="size-4" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2 justify-center">
                                    <Loader2Icon className="size-4 animate-spin" />
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 justify-center">
                                    <SendIcon className="size-4" />
                                    <span>Sign In</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}