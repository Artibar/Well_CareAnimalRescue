// AdminAdoption.jsx
import React, { useEffect } from "react";
import { Trash, Mail, Phone, User, Home, PawPrint, Calendar, AlertCircle, RefreshCw } from "lucide-react";
import Dashboard from "./Dashboard";
import useAdoptionStore from "../../store/useAdoptionStore.js";

const AdminAdoption = () => {
  
  const {
    adoptionList,
    isLoadingAdoptions,
    adoptionsError,
    fetchAdoptionList,
    deleteAdoption,
    getAdoptionStats,
  } = useAdoptionStore();

  // Fetch adoption list on mount
  useEffect(() => {
    fetchAdoptionList();
  }, [fetchAdoptionList]);

  const handleDelete = async (id) => {
    await deleteAdoption(id);
  };

  const handleRefresh = () => {
    fetchAdoptionList();
  };

  // Get statistics
  const stats = getAdoptionStats();
  const BaseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Card */}
        <div className="mb-8">
          <Dashboard
            type="adoption"
            apiUrl={`${BaseUrl}/adoption/get`}
            title="Adoption Dashboard"
          />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Adoption Dashboard
                </h1>
                <button
                  onClick={handleRefresh}
                  disabled={isLoadingAdoptions}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingAdoptions ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <p className="text-gray-600">
                Manage and review animal adoption requests
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              {/* Total */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg min-w-[140px]">
                <p className="text-xs font-medium opacity-90 mb-1">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>

              {/* This Week */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg min-w-[140px]">
                <p className="text-xs font-medium opacity-90 mb-1">This Week</p>
                <p className="text-3xl font-bold">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingAdoptions && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading adoption requests...</p>
          </div>
        )}

        {/* Error State */}
        {adoptionsError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-red-800 mb-1">Error Loading Data</h3>
              <p className="text-red-700">{adoptionsError}</p>
              <button
                onClick={fetchAdoptionList}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingAdoptions && !adoptionsError && adoptionList.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <PawPrint className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Adoption Requests</h3>
            <p className="text-gray-600">There are currently no adoption requests to display.</p>
          </div>
        )}

        {/* Adoption List */}
        {!isLoadingAdoptions && !adoptionsError && adoptionList.length > 0 && (
          <div className="space-y-4">
            {adoptionList.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    {/* Left Side - User Info */}
                    <div className="flex-1 space-y-4">
                      {/* Name */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Applicant Name</p>
                          <p className="text-xl font-bold text-gray-800">{user.name}</p>
                        </div>
                      </div>

                      {/* Animal Type */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                          <PawPrint className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Animal Type</p>
                          <p className="text-lg font-semibold text-gray-800">{user.animalType}</p>
                        </div>
                      </div>

                      {/* Contact Info Row */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-lg shrink-0">
                            <Mail className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-500 font-medium">Email</p>
                            <a
                              href={`mailto:${user.email}`}
                              className="text-sm text-green-600 hover:underline break-all"
                            >
                              {user.email}
                            </a>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                            <Phone className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Phone</p>
                            <a
                              href={`tel:${user.phone}`}
                              className="text-sm text-purple-600 hover:underline"
                            >
                              {user.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
                          <Home className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium">Address</p>
                          <p className="text-sm text-gray-700">{user.address}</p>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm pt-2 border-t border-gray-100">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted: {new Date(user.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}</span>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors group"
                        title="Delete request"
                      >
                        <Trash className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdoption;