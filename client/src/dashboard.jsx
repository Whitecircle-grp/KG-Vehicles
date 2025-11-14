import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhoneModal from './component/PhoneModal';
import VehicleList from './component/VehicleList';
import VehicleForm from './component/VehicleForm';
import EditForm from './component/EditForm';
import { GoShare } from "react-icons/go";
import PhoneList from './component/PhoneDeatils'
import EmailModal from './component/EmailModal';
import EmailList from './component/EmailList';
import { FaCar, FaPhone, FaList, FaEye, FaUsers, FaEnvelope, FaTachometerAlt, FaBell, FaPlus, FaChartBar, FaExclamationTriangle, FaSearch, FaFilter, FaTimes, FaCheck } from "react-icons/fa";
import SmsForm from './messages/SmsFrom';

const Dashboard = () => {
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [showSmsForm, setShowSmsForm] = useState(false);
  const [showPendingUsersModal, setShowPendingUsersModal] = useState(false);
  const [approvingUser, setApprovingUser] = useState(null);
  const [showActiveUsersModal, setShowActiveUsersModal] = useState(false);
  const [showPendingVehiclesModal, setShowPendingVehiclesModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPhoneDetails, setShowPhoneDetails] = useState(false);
  const [showEmailList, setShowEmailList] = useState(false);


  // New state for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpiringSoon, setShowExpiringSoon] = useState(false);

  const userRole = localStorage.getItem('role');

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setVehicles(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch vehicles.', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch phones from backend
  const fetchPhones = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/phones/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch phones');
      setPhones(data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/emails/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch emails');
      setEmails(data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
  };

  // Add phone number to state instantly (called from PhoneModal)
  const handleAddPhone = (newPhone) => {
    setPhones((prevPhones) => [...prevPhones, newPhone]);
  };

  const handleAddEmail = (newEmail) => {
    setEmails((prevEmails) => [...prevEmails, newEmail]);
  }

  useEffect(() => {
    fetchVehicles();
    fetchPhones();
    fetchEmails();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/pending-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPendingUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch pending users:', err);
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/suspend/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        fetchPendingUsers();
        alert('User suspended successfully');
      } else {
        alert('Failed to suspend user');
      }
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Error suspending user');
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${userName}? This action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const isVehicleExpiringSoon = (vehicle) => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const dateFields = [
      'insuranceExpiry',
      'taxExpiry',
      'pollutionExpiry',
      'permitExpiry',
      'fitnessExpiry',
    ];

    return dateFields.some(field => {
      if (vehicle[field]) {
        try {
          const expiryDate = new Date(vehicle[field]);
          return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
        } catch (error) {
          console.error(`Error parsing date ${field}:`, vehicle[field], error);
          return false;
        }
      }
      return false;
    });
  };

  useEffect(() => {
    let filtered = [...vehicles];

    if (searchTerm.trim()) {
      filtered = filtered.filter(vehicle =>
        vehicle.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.ownerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showExpiringSoon) {
      filtered = filtered.filter(vehicle => isVehicleExpiringSoon(vehicle));
    }

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, showExpiringSoon]);

  useEffect(() => {
    fetchVehicles();
    fetchUsers();
    fetchPendingUsers();
  }, []);

  const handleAddClick = () => {
    setMode('add');
    setSelectedVehicle(null);
  };

  const handleEditClick = (vehicle) => {
    setMode('edit');
    setSelectedVehicle(vehicle);
  };

  const handleViewClick = (vehicle) => {
    setMode('view');
    setSelectedVehicle(vehicle);
  };

  const handleSave = async (vehicleData) => {
    console.log("Saved Successfully");
    try {
      await fetchVehicles();
      setMode('');
      setSelectedVehicle(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save vehicle');
    }
  };

  const handleCloseForm = () => {
    setMode('');
    setSelectedVehicle(null);
  };

  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleSmsForm = () => {
    setShowSmsForm(true);
    setSelectedVehicle(null);
  };

  const handleApproveUser = async (userId) => {
    setApprovingUser(userId);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setPendingUsers(pendingUsers.filter(user => user._id !== userId));
      fetchUsers();
    } catch (err) {
      alert('Failed to approve user');
    } finally {
      setApprovingUser(null);
    }
  };

  const handleApproveAllUsers = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/approve-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setPendingUsers([]);
      fetchUsers();
      alert('All users approved successfully!');
    } catch (err) {
      alert('Failed to approve all users', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setVehicles(vehicles.filter((v) => v._id !== vehicleToDelete._id));
    } catch (err) {
      alert('Failed to delete vehicle');
    } finally {
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status !== 'expired').length;
  const pendingVehicles = vehicles.filter(v => v.status === 'expired').length;
  const expiringSoon = vehicles.filter(v => isVehicleExpiringSoon(v)).length;
  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {userRole === "admin" ? "Admin" : "User"}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-300">
              {userRole === "admin"
                ? "Manage vehicles, users, and system analytics"
                : "View vehicles and system information"}
            </p>
          </div>

          {/* Pending Users Button — visible only for Admin */}
          {userRole === "admin" && (
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowPendingUsersModal(true)}
                className={`relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center ${pendingUsers.length > 0 ? "animate-pulse" : ""
                  }`}
              >
                <FaUsers className="mr-2" />
                Pending Users
                {pendingUsers.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {pendingUsers.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions Section — visible only for Admin */}
        {userRole === "admin" && (
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FaChartBar className="mr-3 text-blue-400" />
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Manage Emails Button */}
              <button
                className="bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => setShowEmailModal(true)}
              >
                <FaEnvelope className="mr-3 text-lg" />
                <span>Manage Emails</span>
              </button>

              {/* Manage Contact Number Button */}
              <button
                className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => setShowPhoneModal(true)}
              >
                <FaPhone className="mr-3 text-lg" />
                <span>Manage Contacts</span>
              </button>

              {/* All Email Button */}
              <button
                className="bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 text-gray-300 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => setShowEmailList(true)}
              >
                <FaList className="mr-3 text-lg" />
                <span>All Emails</span>
              </button>

              {/* Phone Details Button */}
              <button
                className="bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 text-gray-300 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => setShowPhoneDetails(true)}
              >
                <FaEye className="mr-3 text-lg" />
                <span>Phone Details</span>
              </button>
            </div>
          </div>
        )}


        {/* Modals */}
        {showEmailModal && (
          <EmailModal onClose={() => setShowEmailModal(false)} onAddEmail={handleAddEmail} />
        )}

        {showPhoneModal && (
          <PhoneModal onClose={() => setShowPhoneModal(false)} onAddPhone={handleAddPhone} />
        )}

        {/* Email List Modal */}
        {showEmailList && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* Email List Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-slate-700/50 p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
                      <FaEnvelope className="text-purple-400 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">All Emails</h2>
                      <p className="text-gray-300 mt-1">View and manage all registered email addresses</p>
                    </div>
                  </div>
                  <button
                    className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
                    onClick={() => setShowEmailList(false)}
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <EmailList  emails={emails} setEmails={setEmails} token={localStorage.getItem('token')} />
              </div>
            </div>
          </div>
        )}

        {/* Phone List Modal */}
        {showPhoneDetails && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* Phone List Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border-b border-slate-700/50 p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                      <FaPhone className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">All Phone Numbers</h2>
                      <p className="text-gray-300 mt-1">View and manage all registered contact numbers</p>
                    </div>
                  </div>
                  <button
                    className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
                    onClick={() => setShowPhoneDetails(false)}
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <PhoneList phones={phones} setPhones={setPhones} token={localStorage.getItem('token')} />
              </div>
            </div>
          </div>
        )}


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Vehicles */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Vehicles</p>
                <p className="text-3xl font-bold text-white">{totalVehicles}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <FaCar className="text-blue-400 text-xl" />
              </div>
            </div>
          </div>

          {/* Active Vehicles */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Vehicles</p>
                <p className="text-3xl font-bold text-green-400">{activeVehicles}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-xl">
                <FaChartBar className="text-green-400 text-xl" />
              </div>
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Expiring Soon</p>
                <p className="text-3xl font-bold text-yellow-400">{expiringSoon}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-xl">
                <FaBell className="text-yellow-400 text-xl" />
              </div>
            </div>
          </div>

          {/* Total Users — visible only to Admin */}
          {userRole === "admin" && (
            <div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setShowActiveUsersModal(true)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-purple-400">{totalUsers}</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <FaUsers className="text-purple-400 text-xl" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter Section */}
        {!loading && !error && vehicles.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by vehicle number or owner name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setShowExpiringSoon(!showExpiringSoon)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${showExpiringSoon
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                    }`}
                >
                  <FaFilter />
                  Expiring Soon
                </button>
              </div>

              {(searchTerm || showExpiringSoon) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowExpiringSoon(false);
                  }}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 rounded-xl transition-all duration-300"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredVehicles.length} of {totalVehicles} vehicles
              {searchTerm && ` matching "${searchTerm}"`}
              {showExpiringSoon && ` with expiring documents`}
            </div>
          </div>
        )}


        {/* Main Content Area */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              <p className="text-gray-300 ml-4 text-lg">Loading vehicles...</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl mb-6 flex items-center">
              <FaExclamationTriangle className="mr-3 text-red-400" />
              {error}
            </div>
          )}

          {!loading && !error && vehicles.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCar className="text-blue-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Vehicles Found</h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Start building your fleet by adding your first vehicle to the system.
              </p>

              {/* Add Vehicle button visible only for Admin */}
              {userRole === "admin" && (
                <button
                  onClick={handleAddClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                >
                  <FaPlus className="mr-2" />
                  Add Your First Vehicle
                </button>
              )}
            </div>
          )}

          {!loading && !error && vehicles.length > 0 && filteredVehicles.length === 0 && (searchTerm || showExpiringSoon) && (
            <div className="text-center py-16">
              <div className="bg-gray-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Vehicles Found</h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                No vehicles match your current search criteria. Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowExpiringSoon(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && vehicles.length > 0 && filteredVehicles.length > 0 && (
            <VehicleList
              vehiclesDetails={filteredVehicles}
              setVehicles={setVehicles}
              onAdd={handleAddClick}
              onEdit={(vehicle) => {
                if (userRole === "admin") handleEditClick(vehicle);
                else handleViewClick(vehicle);
              }}
              onView={handleViewClick}
              onDelete={(vehicle) => {
                if (userRole === "admin") handleDeleteClick(vehicle);
              }}
            />
          )}
       
          {/* For Admin: Add/Edit mode; For User: View only */}
          {(mode === 'add' || mode === 'view') && (
            <div className="mt-8">
              <VehicleForm
                vehicle={{
                  ...selectedVehicle,
                  registrationDate: selectedVehicle?.registrationDate || '',
                  insuranceExpiry: selectedVehicle?.insuranceExpiry || '',
                  fitnessExpiry: selectedVehicle?.fitnessExpiry || '',
                  pollutionExpiry: selectedVehicle?.pollutionExpiry || '',
                  taxExpiry:selectedVehicle?.taxExpiry || '',
                  // add any other date fields here
                }}
                mode={mode}
                onSave={handleSave}
                onClose={handleCloseForm}
                readOnly={userRole !== "admin"}
              />
            </div>
          )}

          {mode === 'edit' && selectedVehicle && (
            <EditForm
              vehicle={{
                ...selectedVehicle,
                registrationDate: selectedVehicle?.registrationDate || '',
                insuranceExpiry: selectedVehicle?.insuranceExpiry || '',
                fitnessExpiry: selectedVehicle?.fitnessExpiry || '',
                pollutionExpiry: selectedVehicle?.pollutionExpiry || '',
                taxExpiry:selectedVehicle?.taxExpiry || '',
                // add any other date fields here
              }}
              onClose={handleCloseForm}
              onSave={handleSave}
              readOnly={userRole !== "admin"}
            />
          )}
        </div>

        {/* Delete Confirmation Modal (Admin Only) */}
        {userRole === "admin" && showDeleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-red-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Confirm Deletion</h2>
                <p className="text-gray-300">
                  Are you sure you want to delete vehicle{' '}
                  <span className="text-white font-semibold">{vehicleToDelete?.vehicleNumber}</span>?
                </p>
                <p className="text-red-300 text-sm mt-2">This action cannot be undone.</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Pending Users Modal with Table */}
        {showPendingUsersModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-orange-500/20 p-3 rounded-xl mr-4">
                    <FaUsers className="text-orange-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Pending User Approvals</h2>
                    <p className="text-gray-300">Review and approve new user registrations</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPendingUsersModal(false)}
                  className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-300"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {pendingUsers.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUsers className="text-green-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Pending Users</h3>
                  <p className="text-gray-300">All user registrations have been processed.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">{pendingUsers.length}</span> users waiting for approval
                    </p>
                    <button
                      onClick={handleApproveAllUsers}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      Approve All
                    </button>
                  </div>

                  <div className="overflow-auto flex-1">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-white/10 backdrop-blur-lg">
                        <tr>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Name</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Email</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Phone</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Registration Date</th>
                          <th className="text-center text-gray-300 font-semibold p-4 border-b border-white/10">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingUsers.map((user, index) => (
                          <tr
                            key={user._id}
                            className="hover:bg-white/5 transition-colors duration-200 border-b border-white/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                  <FaUsers className="text-blue-400 text-sm" />
                                </div>
                                <span className="text-white font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{user.email}</td>
                            <td className="p-4 text-gray-300">{user.phone || 'Not provided'}</td>
                            <td className="p-4 text-gray-300">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleApproveUser(user._id)}
                                disabled={approvingUser === user._id}
                                className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed inline-flex items-center ${approvingUser === user._id ? 'opacity-50' : ''
                                  }`}
                              >
                                {approvingUser === user._id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Approving...
                                  </>
                                ) : (
                                  <>
                                    <FaCheck className="mr-2" />
                                    Approve
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Active Users Modal with Table */}
        {showActiveUsersModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
                    <FaUsers className="text-purple-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Active Users</h2>
                    <p className="text-gray-300">All approved and active users in the system</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowActiveUsersModal(false)}
                  className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-300"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {users.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUsers className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Active Users</h3>
                  <p className="text-gray-300">No approved users in the system yet.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-300">
                      Total <span className="text-white font-semibold">{users.length}</span> active users
                    </p>
                  </div>

                  <div className="overflow-auto flex-1">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-white/10 backdrop-blur-lg">
                        <tr>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Name</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Email</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Phone</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Role</th>
                          <th className="text-left text-gray-300 font-semibold p-4 border-b border-white/10">Joined Date</th>
                          <th className="text-center text-gray-300 font-semibold p-4 border-b border-white/10">Status</th>
                          <th className="text-center text-gray-300 font-semibold p-4 border-b border-white/10">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user._id}
                            className="hover:bg-white/5 transition-colors duration-200 border-b border-white/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                                  <FaUsers className="text-purple-400 text-sm" />
                                </div>
                                <span className="text-white font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{user.email}</td>
                            <td className="p-4 text-gray-300">{user.phone || 'Not provided'}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-blue-500/20 text-blue-300'
                                }`}>
                                {user.role || 'user'}
                              </span>
                            </td>
                            <td className="p-4 text-gray-300">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                Active
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleSuspendUser(user._id)}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 mr-2"
                              >
                                Suspend
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id, user.name)}
                                className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 hover:text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;