import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    const data = await res.json();
    setStatus(data.message);
    setLoading(false);

    if (res.ok) {
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-12 border border-white/20">

        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .106-.01.21-.03.312a4.502 4.502 0 01-3.213 3.213A1.995 1.995 0 007 17v1h10v-1c0-.895-.588-1.658-1.456-1.89a4.502 4.502 0 01-3.213-3.213A2 2 0 0012 11zM12 7a2 2 0 110 4 2 2 0 010-4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">Enter a new password for your account</p>
        </div>

        {status && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {status}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <input
            type="password"
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 bg-white focus:outline-none"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !newPassword}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-purple-600 hover:underline">Back to Login</Link>
        </div>

      </div>
    </div>
  );
}
