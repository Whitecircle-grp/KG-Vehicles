import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../validation/loginFormValidation';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        // const res = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        const { token, user } = data;

        if (res.ok) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', user.role); // either 'admin' or 'user'

          navigate(user.role === 'admin' ? '/dashboard' : '/dashboard');
        } else {
          formik.setStatus(data.message || 'Login failed');
        }
      } catch {
        formik.setStatus('Server error, please try again later');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-12 border border-white/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        {/* Error Message */}
        {formik.status && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{formik.status}</p>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                disabled={isLoading}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-2">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500 mt-2">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
            Forgot your password?
          </Link>
          <div className="mt-4">
            <span className="text-gray-600 text-sm">New user? </span>
            <Link to="/signup" className="text-purple-600 hover:underline font-medium">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
