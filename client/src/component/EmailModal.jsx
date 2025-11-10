import React, { useState, useEffect } from 'react';

const EmailModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time email validation
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleSend = async () => {
    if (!email) {
      setEmailError('Please enter an email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        email: email.toLowerCase().trim()
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 400) {
        setMessage(data.message || 'This email is already added.');
      } else if (res.ok) {
        setMessage('Email added successfully!');
        setEmail('');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error adding email:', err);
      setMessage('Failed to connect to server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && email && !emailError) {
      handleSend();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Email Address</h2>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition duration-200 disabled:opacity-50"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                  emailError 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                disabled={isLoading}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {emailError}
              </p>
            )}
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className={`p-4 rounded-lg flex items-center space-x-2 ${
              message.includes('successfully') 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex-shrink-0">
                {message.includes('successfully') ? (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className={`text-sm font-medium ${
                message.includes('successfully') ? 'text-green-800' : 'text-red-800'
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            disabled={isLoading || !email || emailError}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Email</span>
              </>
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Tip:</p>
              <p>Make sure to enter a valid email address for notifications and updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;

