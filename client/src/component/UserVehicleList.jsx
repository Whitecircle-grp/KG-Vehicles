import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaCar } from 'react-icons/fa';

const UserVehicleList = ({ vehicleDetails }) => {
  const [vehicles, setVehicles] = useState(vehicleDetails);

  const getExpiryStatus = (dateStr) => {
    if (!dateStr) return { color: 'text-gray-200', bgColor: 'bg-gray-600/80', status: 'N/A' };
    
    const expiry = new Date(dateStr);
    const today = new Date();
    const diffInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      return { color: 'text-red-200', bgColor: 'bg-red-600/80', status: 'Expired' };
    } else if (diffInDays <= 7) {
      return { color: 'text-yellow-200', bgColor: 'bg-yellow-600/80', status: 'Expiring Soon' };
    } else if (diffInDays <= 30) {
      return { color: 'text-orange-200', bgColor: 'bg-orange-600/80', status: 'Due Soon' };
    } else {
      return { color: 'text-green-200', bgColor: 'bg-green-600/80', status: 'Valid' };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaCar className="mr-3 text-blue-400" />
            My Vehicles
          </h2>
          <p className="text-gray-300 mt-1">Track your vehicles and document expiry dates</p>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        {vehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCar className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">No Vehicles Found</h3>
            <p className="text-gray-300 mb-6">You don't have any registered vehicles yet. Contact your administrator to add vehicles.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Insurance</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Fitness</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Permit</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Pollution</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Tax</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Created By</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {vehicles.map((v, index) => (
                  <tr key={v.id || index} className="hover:bg-slate-700/40 transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-100 font-semibold">{index + 1}</td>
                    
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-base">{v.vehicleNumber}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaUser className="text-blue-400 mr-2 text-sm" />
                        <span className="text-gray-100 font-medium">{v.ownerName}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {v.vehicleType}
                      </span>
                    </td>
                    
                    {/* Expiry Dates with Status Indicators */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={getExpiryStatus(v.insurance || v.insuranceExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.insurance || v.insuranceExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.insurance || v.insuranceExpiry).bgColor} ${getExpiryStatus(v.insurance || v.insuranceExpiry).color}`}>
                          {getExpiryStatus(v.insurance || v.insuranceExpiry).status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={getExpiryStatus(v.fitnessExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.fitnessExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.fitnessExpiry).bgColor} ${getExpiryStatus(v.fitnessExpiry).color}`}>
                          {getExpiryStatus(v.fitnessExpiry).status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={getExpiryStatus(v.permitExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.permitExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.permitExpiry).bgColor} ${getExpiryStatus(v.permitExpiry).color}`}>
                          {getExpiryStatus(v.permitExpiry).status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={getExpiryStatus(v.pollutionExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.pollutionExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.pollutionExpiry).bgColor} ${getExpiryStatus(v.pollutionExpiry).color}`}>
                          {getExpiryStatus(v.pollutionExpiry).status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={getExpiryStatus(v.taxExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.taxExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.taxExpiry).bgColor} ${getExpiryStatus(v.taxExpiry).color}`}>
                          {getExpiryStatus(v.taxExpiry).status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {v.documentStatus || 'Active'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-gray-100 font-medium">
                      {v.createdBy?.name || v.createdBy?.email || v.createdBy}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-100 font-medium">
                        <FaCalendarAlt className="mr-2 text-blue-400 text-sm" />
                        {v.createdAt ? new Date(v.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVehicleList;
