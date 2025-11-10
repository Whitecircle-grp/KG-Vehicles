// import React, { useEffect, useState } from 'react';
// import VehicleForm from './component/VehicleForm';
// import PhoneModal from './component/PhoneModal';
// import UserVehicleList from './component/UserVehicleList';
// import PhoneList from './component/PhoneDeatils'
// import EmailModal from './component/EmailModal';
// import EmailList from './component/EmailList';
// import { FaTimes } from "react-icons/fa";
// import { FaCar, FaEnvelope, FaPhone, FaList, FaTachometerAlt, FaEye, FaUsers, FaChartBar } from 'react-icons/fa';

// const UserDashboard = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [phones, setPhones] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [showEmailModal, setShowEmailModal] = useState(false);
//   const [showPhoneModal, setShowPhoneModal] = useState(false);
//   const [showPhoneDetails, setShowPhoneDetails] = useState(false);
//   const [showEmailList, setShowEmailList] = useState(false);

//   // Add vehicle to local state
//   const addVehicle = (vehicle) => {
//     setVehicles([...vehicles, { ...vehicle, id: Date.now() }]);
//     setShowForm(false);
//   };

//   // Fetch vehicles from backend
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to fetch vehicles');
//       setVehicles(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Fetch phones from backend
//   const fetchPhones = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/phones/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to fetch phones');
//       setPhones(data);
//     } catch (error) {
//       console.error('Error fetching phones:', error);
//     }
//   };

//   // Add phone number to state instantly (called from PhoneModal)
//   const handleAddPhone = (newPhone) => {
//     setPhones((prevPhones) => [...prevPhones, newPhone]);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchPhones(); // Fetch phones on component mount
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl mr-6">
//                 <FaTachometerAlt className="text-blue-400 text-3xl" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold text-white mb-2">User Dashboard</h1>
//                 <p className="text-gray-300 text-lg">Manage your vehicles, contacts, and communications</p>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center space-x-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-400">{vehicles.length}</div>
//                 <div className="text-sm text-gray-400">Vehicles</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-purple-400">{phones.length}</div>
//                 <div className="text-sm text-gray-400">Contacts</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions Section */}
//         <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-6 mb-8">
//           <h2 className="text-xl font-bold text-white mb-6 flex items-center">
//             <FaChartBar className="mr-3 text-blue-400" />
//             Quick Actions
//           </h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Manage Emails Button */}
//             <button
//               className="bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//               onClick={() => setShowEmailModal(true)}
//             >
//               <FaEnvelope className="mr-3 text-lg" />
//               <span>Manage Emails</span>
//             </button>

//             {/* Manage Contact Number Button */}
//             <button
//               className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//               onClick={() => setShowPhoneModal(true)}
//             >
//               <FaPhone className="mr-3 text-lg" />
//               <span>Manage Contacts</span>
//             </button>

//             {/* All Email Button */}
//             <button
//               className="bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 text-gray-300 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//               onClick={() => setShowEmailList(true)}
//             >
//               <FaList className="mr-3 text-lg" />
//               <span>All Emails</span>
//             </button>

//             {/* Phone Details Button */}
//             <button
//               className="bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 text-gray-300 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//               onClick={() => setShowPhoneDetails(true)}
//             >
//               <FaEye className="mr-3 text-lg" />
//               <span>Phone Details</span>
//             </button>
//           </div>
//         </div>

//         {/* Vehicle Management Section */}
//         <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
//           {/* Vehicle List Header */}
//           <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700/50 p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
//                   <FaCar className="text-blue-400 text-xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">Vehicle Management</h2>
//                   <p className="text-gray-300 mt-1">Track and manage all your registered vehicles</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Vehicle Content */}
//           <div className="p-6">
//             {vehicles.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FaCar className="text-blue-400 text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-4">No Vehicles Found</h3>
//                 <p className="text-gray-300 mb-6">Start by adding your first vehicle to track documentation and expiry dates.</p>
//                 {/* <button
//                   onClick={() => setShowForm(true)}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
//                 >
//                   <FaCar className="mr-2" />
//                   Add Your First Vehicle
//                 </button> */}
//               </div>
//             ) : (
//               <UserVehicleList vehicleDetails={vehicles} setVehicles={setVehicles} />
//             )}
//           </div>
//         </div>

//         {/* Show form */}
//         {showForm && (
//           <VehicleForm onSave={addVehicle} onClose={() => setShowForm(false)} />
//         )}

//         {/* Modals */}
//         {showEmailModal && (
//           <EmailModal onClose={() => setShowEmailModal(false)} />
//         )}
        
//         {showPhoneModal && (
//           <PhoneModal onClose={() => setShowPhoneModal(false)} onAddPhone={handleAddPhone} />
//         )}

//         {/* Email List Modal */}
//         {showEmailList && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
//               {/* Email List Header */}
//               <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-slate-700/50 p-6">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
//                       <FaEnvelope className="text-purple-400 text-xl" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">All Emails</h2>
//                       <p className="text-gray-300 mt-1">View and manage all registered email addresses</p>
//                     </div>
//                   </div>
//                   <button
//                     className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
//                     onClick={() => setShowEmailList(false)}
//                   >
//                     <FaTimes className="text-lg" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 overflow-y-auto max-h-[60vh]">
//                 <EmailList token={localStorage.getItem('token')} />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Phone List Modal */}
//         {showPhoneDetails && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
//               {/* Phone List Header */}
//               <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border-b border-slate-700/50 p-6">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
//                       <FaPhone className="text-blue-400 text-xl" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">All Phone Numbers</h2>
//                       <p className="text-gray-300 mt-1">View and manage all registered contact numbers</p>
//                     </div>
//                   </div>
//                   <button
//                     className="bg-slate-700/60 hover:bg-slate-600/60 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
//                     onClick={() => setShowPhoneDetails(false)}
//                   >
//                     <FaTimes className="text-lg" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 overflow-y-auto max-h-[60vh]">
//                 <PhoneList phones={phones} setPhones={setPhones} token={localStorage.getItem('token')} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
