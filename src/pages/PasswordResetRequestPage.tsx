import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthFormWrapper from '@/components/AuthFormWrapper'; // Custom component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react'; // Icons for alerts

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type PasswordResetRequestFormValues = z.infer<typeof formSchema>;

const PasswordResetRequestPage: React.FC = () => {
  console.log('PasswordResetRequestPage loaded');
  const navigate = useNavigate();
  const [formSubmissionMessage, setFormSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetRequestFormValues) => {
    setFormSubmissionMessage(null); // Clear previous messages
    console.log('Password reset requested for:', data.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Assume success for now
    setFormSubmissionMessage({
      type: 'success',
      text: 'If an account with that email exists, a password reset link has been sent. Please check your inbox (and spam folder).',
    });
    form.reset(); // Clear the form on success
  };

  return (
    <AuthFormWrapper formTitle="Reset Your Password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formSubmissionMessage && (
            <Alert variant={formSubmissionMessage.type === 'error' ? 'destructive' : 'default'} className={formSubmissionMessage.type === 'success' ? 'bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700' : ''}>
              {formSubmissionMessage.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{formSubmissionMessage.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
              <AlertDescription>
                {formSubmissionMessage.text}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center text-sm">
        <Link to="/" className="font-medium text-primary hover:text-primary/80">
          Back to Login
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default PasswordResetRequestPage;