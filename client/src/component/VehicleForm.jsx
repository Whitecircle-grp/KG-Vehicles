import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaCar, FaUser, FaCalendarAlt, FaSave, FaTimes, FaEye, FaEdit, FaPlus,
  FaFileAlt, FaShieldAlt, FaCertificate, FaLeaf, FaMoneyBillWave
} from 'react-icons/fa';

const VehicleForm = ({ vehicle, mode, onClose, onSave }) => {
  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isAdd = mode === 'add';
  const inputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    ownerName: '',
    insuranceExpiry: '',
    fitnessExpiry: '',
    permitExpiry: '',
    pollutionExpiry: '',
    taxExpiry: '',
    documentStatus: '',
    createdBy: '',
  });

  const dateFields = [
    'insuranceExpiry',
    'fitnessExpiry',
    'permitExpiry',
    'pollutionExpiry',
    'taxExpiry',
  ];

  const fields = [
    'vehicleNumber',
    'ownerName',
    'vehicleType',
    'insuranceExpiry',
    'fitnessExpiry',
    'permitExpiry',
    'pollutionExpiry',
    'taxExpiry',
    'documentStatus',
    'createdBy',
  ];

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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?._id;
    const userEmail = storedUser?.email;

    if ((isEdit || isView) && vehicle) {
      setFormData({
        vehicleNumber: vehicle.vehicleNumber || '',
        vehicleType: vehicle.vehicleType || '',
        ownerName: vehicle.ownerName || '',
        insuranceExpiry: vehicle.insuranceExpiry || '',
        fitnessExpiry: vehicle.fitnessExpiry || '',
        permitExpiry: vehicle.permitExpiry || '',
        pollutionExpiry: vehicle.pollutionExpiry || '',
        taxExpiry: vehicle.taxExpiry || '',
        documentStatus: vehicle.documentStatus || '',
        createdBy: vehicle.createdBy?._id || userId || '',
        _id: vehicle._id,
      });
    } else if (isAdd) {
      setFormData({
        vehicleNumber: '',
        vehicleType: '',
        ownerName: '',
        insuranceExpiry: '',
        fitnessExpiry: '',
        permitExpiry: '',
        pollutionExpiry: '',
        taxExpiry: '',
        documentStatus: '',
        createdBy: userId || '',
        oldVehicle: false,
      });
    }

    if (inputRef.current && !isView) {
      inputRef.current.focus();
    }
  }, [vehicle, isEdit, isView, isAdd]);

  const handleChange = (e) => {
    if (isView) return;
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (date, field) => {
    if (isView) return;
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isAdd) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/vehicles`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        alert('Vehicle added successfully!');
        onSave(response.data);
      } else if (isEdit) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/vehicles/${formData._id}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        alert('Vehicle updated successfully!');
        onSave(response.data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Failed to update details 🥲');
    } finally {
      setLoading(false);
    }
  };

  const getModeIcon = () => {
    if (isView) return FaEye;
    if (isEdit) return FaEdit;
    return FaPlus;
  };

  const ModeIcon = getModeIcon();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                <ModeIcon className="text-blue-400 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isView
                    ? 'View Vehicle Details'
                    : isEdit
                    ? 'Edit Vehicle'
                    : 'Add New Vehicle'}
                </h2>
                <p className="text-gray-300 mt-1">
                  {isView
                    ? 'Vehicle information and documentation status'
                    : isEdit
                    ? 'Update vehicle information and documents'
                    : 'Register a new vehicle in the system'}
                </p>
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
            {/* Basic Info */}
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaCar className="mr-2 text-blue-400" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(0, 3).map((field, idx) => {
                  const IconComponent = fieldIcons[field];
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <IconComponent className="mr-2 text-blue-400 text-sm" />
                        {fieldLabels[field]}
                      </label>
                      <input
                        ref={idx === 0 ? inputRef : null}
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        disabled={isView}
                        className={`w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white ${
                          isView ? 'cursor-not-allowed opacity-75' : 'hover:bg-slate-600/70'
                        }`}
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expiry Dates */}
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
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <IconComponent className="mr-2 text-blue-400 text-sm" />
                        {fieldLabels[field]}
                      </label>
                      <DatePicker
                        selected={formData[field] ? new Date(formData[field]) : null}
                        onChange={(date) => handleDateChange(date, field)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date"
                        disabled={isView}
                        className={`w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white ${
                          isView ? 'cursor-not-allowed opacity-75' : 'hover:bg-slate-600/70'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Section */}
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-blue-400" />
                Status & Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-blue-400 text-sm" />
                    Document Status
                  </label>
                  <input
                    type="text"
                    name="documentStatus"
                    value={formData.documentStatus}
                    onChange={handleChange}
                    disabled={isView}
                    className={`w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-white ${
                      isView ? 'cursor-not-allowed opacity-75' : 'hover:bg-slate-600/70'
                    }`}
                    placeholder="'Active/Expired/Warning"
                  />
                </div>

                {/* Created By */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <FaUser className="mr-2 text-blue-400 text-sm" />
                    Created By
                  </label>
                  <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    disabled
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500/50 rounded-xl text-gray-300 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl"
              >
                <FaTimes className="mr-2 inline" />
                {isView ? 'Close' : 'Cancel'}
              </button>

              {!isView && (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl"
                >
                  <FaSave className="mr-2 inline" />
                  {loading ? 'Saving...' : isEdit ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
