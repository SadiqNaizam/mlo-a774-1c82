import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthFormWrapper from '@/components/AuthFormWrapper';
// Header and Footer are part of AuthFormWrapper, so direct import here is not needed for rendering them.

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';

const passwordResetConfirmSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set the error on the confirmPassword field
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmSchema>;

const PasswordResetConfirmPage: React.FC = () => {
  console.log('PasswordResetConfirmPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token = searchParams.get('token'); // Example: if token is passed in URL

  const form = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordResetConfirmFormValues) => {
    setError(null);
    setSuccess(null);
    console.log('Password reset form submitted with token:', token, 'and data:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example: Check if token is valid (in a real app, this would be part of API call)
    if (!token) {
        setError("Invalid or expired password reset link.");
        form.reset();
        return;
    }

    // Simulate success
    if (data.newPassword === "password123") { // Mock successful password change
        setSuccess("Your password has been successfully reset. You will be redirected to login shortly.");
        form.reset();
        setTimeout(() => {
            navigate('/'); // Navigate to LoginPage as per App.tsx
        }, 3000);
    } else {
        // Simulate general error from API
        setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <AuthFormWrapper formTitle="Set New Password">
      {token ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                 <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !!success}>
              {form.formState.isSubmitting ? "Resetting..." : "Set New Password"}
            </Button>
          </form>
        </Form>
      ) : (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Invalid Link</AlertTitle>
          <AlertDescription>
            The password reset link is missing or invalid. Please request a new one.
            <Link to="/password-reset-request" className="font-medium text-primary hover:underline ml-1">
              Request new link
            </Link>
          </AlertDescription>
        </Alert>
      )}
       <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Remembered your password?{' '}
        <Link to="/" className="font-semibold text-primary hover:text-primary/80 dark:hover:text-primary/90">
          Log in
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default PasswordResetConfirmPage;