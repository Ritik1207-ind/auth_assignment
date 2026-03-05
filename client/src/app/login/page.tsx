'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

// Wrap the main logic in a component to handle SearchParams safely
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State Management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check for registration success flag
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // 1. Call Backend API
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // 2. Store Token (JWT)
      // Note: Ideally, store this in an HTTP-Only cookie from the backend. 
      // For this example, we use localStorage.
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 3. Redirect to Dashboard
      router.push('/');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Success Banner (if redirected from Register) */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-fade-in">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-shake">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Signing In...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
            Create free account
          </Link>
        </p>
      </div>
    </div>
  );
}

// Main Page Component
export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Side - Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative justify-center items-center overflow-hidden">
        {/* Background Gradients - Distinct from Register page (Blue/Cyan) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-20 max-w-lg px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">"Security is not a product, but a process."</h2>
          <p className="text-gray-400 text-lg italic">- Bruce Schneier</p>
          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              System Operational
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 sm:p-12">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}