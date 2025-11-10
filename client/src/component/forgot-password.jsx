import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        errors.email = "Invalid email format";
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage("");
      formik.setStatus("");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setSuccessMessage("Reset link sent! Check your inbox.");
          formik.resetForm();
        } else {
          formik.setStatus(data.message || "Failed to send reset link");
        }
      } catch {
        formik.setStatus("Server error, please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-12 border border-white/20">

        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2 .672 2 1.5S13.104 14 12 14s-2-.672-2-1.5S10.896 11 12 11zM12 8c1.657 0 3 1.12 3 2.5S13.657 13 12 13s-3-1.12-3-2.5S10.343 8 12 8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7.031 3 3 6.589 3 11c0 2.502 1.219 4.729 3.126 6.234C7.141 18.167 7 19.287 7 21c1.547-.619 3.139-2.06 3.644-2.608A10.936 10.936 0 0012 21c1.102 0 2.17-.168 3.174-.471C15.855 22.074 17.453 23.5 19 24c0-1.715-.141-2.834.874-3.766C19.781 15.729 21 13.502 21 11c0-4.411-4.031-8-9-8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">Enter your email to reset your password</p>
        </div>

        {formik.status && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {formik.status}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            ✅ {successMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-4 pr-4 py-3 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-300 bg-red-50 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
              disabled={isLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-2">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !formik.values.email}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-purple-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
