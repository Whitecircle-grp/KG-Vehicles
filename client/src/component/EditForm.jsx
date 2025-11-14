import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCar, FaUser, FaCalendarAlt, FaSave, FaTimes, FaEdit, FaFileAlt, FaShieldAlt, FaCertificate, FaLeaf, FaMoneyBillWave } from 'react-icons/fa';

const EditForm = ({ vehicle, onClose, onSave }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    ownerName: '',
    insuranceExpiry: null,
    fitnessExpiry: null,
    permitExpiry: null,
    pollutionExpiry: null,
    taxExpiry: null,
    documentStatus: '',
    createdBy: '',
    oldVehicle: false,
    _id: '',
  });

  const dateFields = [
    'insuranceExpiry',
    'fitnessExpiry',
    'permitExpiry',
    'pollutionExpiry',
    'taxExpiry',
  ];

  const fields = ['vehicleNumber', 'ownerName', 'vehicleType'];

  const fieldIcons = {
    vehicleNumber: FaCar,
    ownerName: FaUser,
    vehicleType: FaCar,
    insuranceExpiry: FaShieldAlt,
    fitnessExpiry: FaCertificate,
    permitExpiry: FaFileAlt,
    pollutionExpiry: FaLeaf,
    taxExpiry: FaMoneyBillWave,
    documentStatus: FaFileAlt,
    createdBy: FaUser,
  };

  const fieldLabels = {
    vehicleNumber: 'Vehicle Number',
    ownerName: 'Owner Name',
    vehicleType: 'Vehicle Type',
    insuranceExpiry: 'Insurance Expiry',
    fitnessExpiry: 'Fitness Expiry',
    permitExpiry: 'Permit Expiry',
    pollutionExpiry: 'Pollution Expiry',
    taxExpiry: 'Tax Expiry',
    documentStatus: 'Document Status',
    createdBy: 'Created By',
  };

  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicleNumber: vehicle.vehicleNumber || '',
        vehicleType: vehicle.vehicleType || '',
        ownerName: vehicle.ownerName || '',
        insuranceExpiry: vehicle.insuranceExpiry ? vehicle.insuranceExpiry : null,
        fitnessExpiry: vehicle.fitnessExpiry ? vehicle.fitnessExpiry : null,
        permitExpiry: vehicle.permitExpiry ? vehicle.permitExpiry : null,
        pollutionExpiry: vehicle.pollutionExpiry ? vehicle.pollutionExpiry : null,
        taxExpiry: vehicle.taxExpiry ? vehicle.taxExpiry : null,
        documentStatus: vehicle.documentStatus || '',
        createdBy: vehicle.createdBy || '',
        oldVehicle: vehicle.oldVehicle || false,
        _id: vehicle._id,
      });

      console.log(vehicle);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { _id, ...dataToSend } = formData;

      const preparedData = { ...dataToSend };
      dateFields.forEach((field) => {
        const dateValue = formData[field];
        if (dateValue && !isNaN(new Date(dateValue).getTime())) {
          preparedData[field] = new Date(dateValue).toISOString().split('T')[0];
        } else {
          preparedData[field] = ''; // or null depending on backend
        }
      });


      if (typeof preparedData.createdBy === 'object' && preparedData.createdBy._id) {
        preparedData.createdBy = preparedData.createdBy._id;
      }

      // Make API call
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${_id}`,
        preparedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Vehicle updated successfully! ✅');
        onSave(response.data);
        onClose();
      } else {
        alert('Failed to update vehicle 🥲');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle 🥲');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                <FaEdit className="text-blue-400 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Vehicle</h2>
                <p className="text-gray-300 mt-1">Update vehicle information and documentation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaCar className="mr-2 text-blue-400" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field, idx) => {
                  const IconComponent = fieldIcons[field];
                  return (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                      >
                        <IconComponent className="mr-2 text-blue-400 text-sm" />
                        {fieldLabels[field]}
                      </label>
                      <input
                        ref={idx === 0 ? inputRef : null}
                        type="text"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-600/70"
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Expiry Dates Section */}
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-400" />
                Document Expiry Dates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dateFields.map((field) => {
                  const IconComponent = fieldIcons[field];
                  return (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                      >
                        <IconComponent className="mr-2 text-blue-400 text-sm" />
                        {fieldLabels[field]}
                      </label>
                      <div className="relative">
                        <DatePicker
                          id={field}
                          selected={
                            formData[field] && !isNaN(new Date(formData[field]).getTime())
                              ? new Date(formData[field])
                              : null
                          }
                          onChange={(date) => handleDateChange(date, field)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-600/70"
                        />
                        <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status and Settings Section */}
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-blue-400" />
                Status & Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Status */}
                <div>
                  <label
                    htmlFor="documentStatus"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                  >
                    <FaFileAlt className="mr-2 text-blue-400 text-sm" />
                    Document Status
                  </label>
                  <input
                    type="text"
                    id="documentStatus"
                    name="documentStatus"
                    value={formData.documentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-600/70"
                    placeholder="Enter document status"
                  />
                </div>

                {/* Created By */}
                <div>
                  <label
                    htmlFor="createdBy"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                  >
                    <FaUser className="mr-2 text-blue-400 text-sm" />
                    Created By
                  </label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    value={
                      formData.createdBy
                        ? formData.createdBy.name || formData.createdBy.email || formData.createdBy
                        : ''
                    }
                    className="w-full px-4 py-3 bg-slate-600/30 border border-slate-500/30 rounded-xl text-gray-400 cursor-not-allowed opacity-75"
                    disabled
                  />
                </div>
              </div>

              {/* Old Vehicle Checkbox */}
              <div className="mt-6">
                <div className="flex items-center gap-3 p-4 bg-slate-600/30 border border-slate-500/30 rounded-xl">
                  <input
                    type="checkbox"
                    id="oldVehicle"
                    name="oldVehicle"
                    checked={formData.oldVehicle || false}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="oldVehicle" className="text-sm text-gray-300 flex items-center">
                    <FaFileAlt className="mr-2 text-blue-400" />
                    Old Vehicle (Disable Notifications)
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl border border-slate-600/50 transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FaSave className="mr-2" />
                {loading ? 'Updating...' : 'Update Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;


