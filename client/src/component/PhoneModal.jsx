import React, { useState, useEffect } from 'react';

const PhoneModal = ({ onClose, onAddPhone }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Phone validation for international format
  const validatePhone = (phone) => {
    // International format: +CountryCode followed by 7-15 digits
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    return phoneRegex.test(phone.trim());
  };

  // Real-time phone validation
  useEffect(() => {
    if (phone && !validatePhone(phone)) {
      setPhoneError('Please enter a valid international phone number (e.g., +1234567890)');
    } else {
      setPhoneError('');
    }
  }, [phone]);

  const handleSend = async () => {
    if (!phone) {
      setPhoneError('Please enter a phone number');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid international phone number (e.g., +1234567890)');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/phones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Backend error:', data);
        setMessage(data.message || 'Something went wrong.');
      } else {
        setMessage('Phone added successfully!');
        setPhone('');

        // Pass back the new phone object to parent to update list
        if (onAddPhone) onAddPhone(data);

        // Auto close after 1.5 sec
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      setMessage('Failed to connect to server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && phone && !phoneError) {
      handleSend();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const formatPhoneInput = (value) => {
    // For international format, we don't auto-format, just return the value
    return value;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Phone Number</h2>
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
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                  phoneError 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                disabled={isLoading}
              />
            </div>
            {phoneError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {phoneError}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">Enter in international format (e.g., +911234567890, +12345678901)</p>
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
            disabled={isLoading || !phone || phoneError}
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
                <span>Add Phone</span>
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
              <p>Enter your phone number in international format starting with + and country code.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
