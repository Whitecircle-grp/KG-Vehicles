import React, { useEffect, useState } from 'react';

const PhoneList = ({ phones, setPhones, token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPhones = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/phones`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch phone numbers');

      setPhones(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching phones:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePhone = async (id) => {
    if (!window.confirm('Are you sure you want to delete this phone number?')) return;

    try {
      setDeletingId(id);
      setError('');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/phones/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete phone number');
      }

      // Remove from state instantly
      setPhones((prev) => prev.filter((phone) => phone.id !== id && phone._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting phone:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatPhoneNumber = (phone) => {
    // Simple formatting for display (adjust based on your needs)
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone; // Return original if not standard format
  };

  const filteredPhones = phones.filter(phone => 
    phone.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPhones();
  }, [token]);

  const retryFetch = () => {
    setError('');
    fetchPhones();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading phone numbers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">Error loading phone numbers</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <div className="ml-4">
            <button
              onClick={retryFetch}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {phones.length > 0 && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Phone List */}
      {filteredPhones.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Phone Numbers ({filteredPhones.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredPhones.map((phone) => (
              <div
                key={phone.id || phone._id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {formatPhoneNumber(phone.phone)}
                      </p>
                      {phone.isPrimary && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Primary
                        </span>
                      )}
                    </div>
                    {phone.label && (
                      <p className="text-sm text-gray-500">{phone.label}</p>
                    )}
                    {phone.createdAt && (
                      <p className="text-xs text-gray-400">
                        Added {new Date(phone.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(phone.phone)}
                    className="text-gray-400 hover:text-purple-600 transition duration-200"
                    title="Copy phone number"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => deletePhone(phone.id || phone._id)}
                    disabled={deletingId === (phone.id || phone._id)}
                    className="text-red-400 hover:text-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete phone number"
                  >
                    {deletingId === (phone.id || phone._id) ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No phone numbers found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'No phone numbers match your search.' : 'Get started by adding your first phone number.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {phones.length > 0 && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total: {phones.length} phone number{phones.length !== 1 ? 's' : ''}</span>
            {searchTerm && (
              <span>Showing: {filteredPhones.length} result{filteredPhones.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneList;
