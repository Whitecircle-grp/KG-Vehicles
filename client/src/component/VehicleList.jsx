import React, { useState } from 'react';
import Modal from './Modal';
import { FaEye, FaEdit, FaTrash, FaPlus, FaExclamationTriangle, FaCalendarAlt, FaUser, FaCar } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";




const VehicleList = ({ vehiclesDetails, onAdd, onEdit, onView, onDelete }) => {
  const userRole = localStorage.getItem('role');
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const getTodayForFileName = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${day}-${month}-${year}`;
  };


  const exportToPDF = () => {
    const fileDate = getTodayForFileName();
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(14);
    doc.text("Vehicle List Report", 14, 15);

    const tableColumn = [
      "#",
      "Vehicle No",
      "Owner",
      "Type",
      "Insurance",
      "Fitness",
      "Permit",
      "Pollution",
      "Tax",
      "Status",
    ];

    const tableRows = vehiclesDetails.map((v, index) => [
      index + 1,
      v.vehicleNumber,
      v.ownerName,
      v.vehicleType,
      formatDate(v.insuranceExpiry),
      formatDate(v.fitnessExpiry),
      formatDate(v.permitExpiry),
      formatDate(v.pollutionExpiry),
      v.taxExpiry || "N/A",
      v.documentStatus,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },

      didDrawPage: (data) => {
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor(120);

        doc.text(
          `Downloaded on: ${fileDate}`,
          data.settings.margin.left,
          pageHeight - 10
        );
      },
    });

    doc.save(`vehicle_list_${fileDate}.pdf`);
  };

  const exportToExcel = () => {
    const fileDate = getTodayForFileName();
    const data = vehiclesDetails.map((v, index) => ({
      "#": index + 1,
      "Vehicle Number": v.vehicleNumber,
      "Owner Name": v.ownerName,
      "Vehicle Type": v.vehicleType,
      "Insurance Expiry": formatDate(v.insuranceExpiry),
      "Fitness Expiry": formatDate(v.fitnessExpiry),
      "Permit Expiry": formatDate(v.permitExpiry),
      "Pollution Expiry": formatDate(v.pollutionExpiry),
      "Tax Expiry": v.taxExpiry || "N/A",
      "Status": v.documentStatus,
      "Created By": v.createdBy?.name || v.createdBy?.email,
      "Created At": formatDate(v.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `vehicle_list_${fileDate}.xlsx`);
  };

  const confirmDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (onDelete && vehicleToDelete) {
      onDelete(vehicleToDelete);
    }
    setShowModal(false);
    setVehicleToDelete(null);
  };

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
            Vehicle Management
          </h2>
          <p className="text-gray-300 mt-1">Manage all vehicles and their documentation</p>
        </div>
        <div className="flex gap-3">
          {userRole === 'admin' && (
            <button
              onClick={onAdd}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                       text-white font-semibold py-3 px-6 rounded-xl shadow-lg 
                       hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add New Vehicle
            </button>
          )}
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Export PDF
          </button>

          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Vehicles Grid/Table */}
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        {vehiclesDetails.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCar className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">No Vehicles Found</h3>
            <p className="text-gray-200 mb-6">Start by adding your first vehicle to the system.</p>
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
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-200 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {vehiclesDetails.map((v, index) => (
                  <tr key={v._id || index} className="hover:bg-slate-700/40 transition-colors duration-200">
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
                        <span className={getExpiryStatus(v.insuranceExpiry).color + " font-semibold text-sm"}>
                          {formatDate(v.insuranceExpiry)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block w-fit font-semibold ${getExpiryStatus(v.insuranceExpiry).bgColor} ${getExpiryStatus(v.insuranceExpiry).color}`}>
                          {getExpiryStatus(v.insuranceExpiry).status}
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

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/*                         <button 
                          onClick={() => onView(v)} 
                          className="bg-blue-600/80 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-all duration-200 hover:scale-110 shadow-lg"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button> */}
                        {/* ✏️ Edit button (acts as View for users) */}
                        <button
                          onClick={() => {
                            if (userRole === 'admin') onEdit(v);
                            else onView(v);
                          }}
                          className="bg-green-600/80 hover:bg-green-600 text-white p-2.5 rounded-lg 
                                     transition-all duration-200 hover:scale-110 shadow-lg"
                          title={userRole === 'admin' ? 'Edit Vehicle' : 'View Vehicle'}
                        >
                          <FaEdit className="text-sm" />
                        </button>

                        {/* 🗑️ Delete button visible only for Admin */}
                        {userRole === 'admin' && (
                          <button
                            onClick={() => confirmDelete(v)}
                            className="bg-red-600/80 hover:bg-red-600 text-white p-2.5 rounded-lg 
                                       transition-all duration-200 hover:scale-110 shadow-lg"
                            title="Delete Vehicle"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirm Deletion</h3>
              <p className="text-gray-300">
                Are you sure you want to delete vehicle{' '}
                <span className="text-white font-semibold">{vehicleToDelete?.vehicleNumber}</span>?
              </p>
              <p className="text-red-300 text-sm mt-2">This action cannot be undone.</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
