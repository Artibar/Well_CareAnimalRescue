
import React, { useEffect } from "react";
import { MapPin, AlertCircle, Phone, User, Home, Calendar } from "lucide-react";
import Dashboard from "../Admin/Dashboard";
import useRescueStore from "../../store/useRescueStore.js"

const AdminRescue = () => {
  
  const {
    rescueList,
    isLoadingRescues,
    rescuesError,
    fetchRescueList,
    openMap,
    getImageURL,
  } = useRescueStore();

  // Fetch rescue list on component mount
  useEffect(() => {
    fetchRescueList();
  }, [fetchRescueList]);
  const BaseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Card */}
        <div className="mb-8">
          <Dashboard
            type="rescue"
            apiUrl={`${BaseUrl}/rescues/get`}
            title="Rescue Dashboard"
          />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Rescue Dashboard
              </h1>
              <p className="text-gray-600">
                Manage and respond to animal rescue requests
              </p>
            </div>
            
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg min-w-[200px]">
              <p className="text-sm font-medium opacity-90 mb-1">Total Requests</p>
              <p className="text-5xl font-bold">{rescueList.length}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingRescues && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading rescue requests...</p>
          </div>
        )}

        {/* Error State */}
        {rescuesError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 mb-1">Error Loading Data</h3>
              <p className="text-red-700">{rescuesError}</p>
              <button
                onClick={fetchRescueList}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingRescues && !rescuesError && rescueList.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Rescue Requests</h3>
            <p className="text-gray-600">There are currently no rescue requests to display.</p>
          </div>
        )}

        {/* Rescue List */}
        {!isLoadingRescues && !rescuesError && rescueList.length > 0 && (
          <div className="space-y-6">
            {rescueList.map((rescue) => {
              const imageURL = getImageURL(rescue.image);

              return (
                <div
                  key={rescue._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Emergency Banner */}
                  {rescue.isEmergency && (
                    <div className="bg-red-600 text-white py-2 px-6 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 animate-pulse" />
                      <span className="font-semibold text-sm">EMERGENCY CASE - PRIORITY RESPONSE REQUIRED</span>
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left Column - Contact Info */}
                      <div className="md:col-span-2 space-y-4">
                        {/* Name */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Name</p>
                            <p className="text-lg font-bold text-gray-800">{rescue.name}</p>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-lg shrink-0">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                            <a
                              href={`tel:${rescue.phone}`}
                              className="text-lg font-bold text-green-600 hover:underline"
                            >
                              {rescue.phone}
                            </a>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                            <Home className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Address</p>
                            <p className="text-gray-800">{rescue.address}</p>
                          </div>
                        </div>

                        {/* Animal Type */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                            <span className="text-lg">🐾</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Animal Type</p>
                            <p className="text-gray-800 font-semibold">{rescue.animalType}</p>
                          </div>
                        </div>

                        {/* Manual Location */}
                        {rescue.manualLocation && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg shrink-0">
                              <MapPin className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">Location Details</p>
                              <p className="text-gray-800">{rescue.manualLocation}</p>
                            </div>
                          </div>
                        )}

                        {/* Live Location Coordinates */}
                        {rescue.liveLocation && (
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              GPS Coordinates
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-600">Latitude</p>
                                <p className="font-mono font-semibold text-green-700">
                                  {rescue.liveLocation.latitude?.toFixed(6) || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Longitude</p>
                                <p className="font-mono font-semibold text-green-700">
                                  {rescue.liveLocation.longitude?.toFixed(6) || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Google Maps Button */}
                        {(rescue.manualLocation || rescue.liveLocation) && (
                          <button
                            onClick={() =>
                              openMap(
                                rescue.liveLocation?.latitude
                                  ? rescue.liveLocation
                                  : rescue.manualLocation
                              )
                            }
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-5 h-5" />
                            Open in Google Maps
                          </button>
                        )}
                      </div>

                      {/* Right Column - Image */}
                      <div className="flex flex-col gap-4">
                        {imageURL ? (
                          <div className="relative">
                            <img
                              src={imageURL}
                              alt="Rescue Animal"
                              className="w-full h-64 md:h-full object-cover rounded-xl shadow-lg"
                            />
                            <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                              Photo Available
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <Camera className="w-12 h-12 mx-auto mb-2" />
                              <p className="text-sm font-medium">No photo uploaded</p>
                            </div>
                          </div>
                        )}

                        {/* Request Info */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Request ID: {rescue._id.slice(-8)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRescue;