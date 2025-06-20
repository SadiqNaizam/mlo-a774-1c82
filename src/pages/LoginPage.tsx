import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { AlertTriangle, Mail, Lock } from 'lucide-react';

import AuthFormWrapper from '@/components/AuthFormWrapper'; // Custom component
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Can be more specific, e.g., min(8)
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    console.log('Login form submitted:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example credentials
    if (values.email === 'user@example.com' && values.password === 'password123') {
      toast.success('Login Successful!', { description: 'Welcome back.' });
      // In a real app, you would navigate to a protected dashboard page.
      // navigate('/dashboard'); 
      // For this example, we'll reset the form as no dashboard route is defined in App.tsx
      form.reset();
    } else {
      const errorMessage = 'Invalid email or password. Please try again.';
      setFormError(errorMessage);
      toast.error('Login Failed', { description: errorMessage });
      form.setValue('password', ''); // Clear password field on error
    }
  };

  return (
    <AuthFormWrapper formTitle="Login to SecureApp">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="pl-10"
                      aria-describedby="email-error"
                    />
                  </div>
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="pl-10"
                      aria-describedby="password-error"
                    />
                  </div>
                </FormControl>
                <FormMessage id="password-error" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              to="/password-reset-request" // Path from App.tsx
              className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
            >
              Forgot Password?
            </Link>
          </div>

          {formError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          to="/registration" // Path from App.tsx
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default LoginPage;