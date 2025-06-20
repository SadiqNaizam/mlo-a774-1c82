import React from 'react';
import Header from '@/components/Header'; // Assuming Header.tsx exists in src/components
import Footer from '@/components/Footer'; // Assuming Footer.tsx exists in src/components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  formTitle?: string; // Optional title for the form card (e.g., "Login", "Sign Up")
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ children, formTitle }) => {
  console.log('AuthFormWrapper loaded');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl bg-white dark:bg-slate-900">
          {formTitle && (
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {formTitle}
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className={formTitle ? "pt-0 p-6" : "p-6"}>
            {children}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthFormWrapper;