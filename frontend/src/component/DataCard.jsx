import React, { useState, useEffect } from 'react';
import { AlertCircle, Search, Filter, RefreshCw, PawPrint, Users, Ambulance, Heart, User, Phone, Mail, Home, Calendar, MapPin, ExternalLink, TrendingUp, DollarSign, MessageCircle } from 'lucide-react';

// DataField Component
const DataField = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 sm:gap-3">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 sm:mt-1 flex-shrink-0" />
    <div className="min-w-0 flex-1">
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-sm sm:text-base text-gray-800 break-words">
        {value || 'N/A'}
      </p>
    </div>
  </div>
);

// DataCard Component with Image and Map support
const DataCard = ({ data, type }) => {
  const openMap = (location) => {
    if (location) {
      const query = encodeURIComponent(location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  const renderContent = () => {
    switch(type) {
      case 'adoption':
        return (
          <>
            <DataField icon={User} label="Name" value={data.name} />
            <DataField icon={Mail} label="Email" value={data.email} />
            <DataField icon={Phone} label="Phone" value={data.phone} />
            <DataField icon={Home} label="Address" value={data.address} />
            <DataField icon={PawPrint} label="Animal Type" value={data.animalType} />
            {data.createdAt && <DataField icon={Calendar} label="Applied On" value={new Date(data.createdAt).toLocaleDateString()} />}
            {data.address && (
              <div className="col-span-full mt-2">
                <button
                  onClick={() => openMap(data.address)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  View Location on Map
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        );
      
      case 'volunteer':
        return (
          <>
            <DataField icon={User} label="Name" value={data.name} />
            <DataField icon={Mail} label="Email" value={data.email} />
            <DataField icon={Phone} label="Phone" value={data.phone} />
            <DataField icon={Home} label="Address" value={data.address} />
            <DataField icon={Users} label="Skills" value={data.skills} />
           
            {data.createdAt && <DataField icon={Calendar} label="Registered On" value={new Date(data.createdAt).toLocaleDateString()} />}
            {data.address && (
              <div className="col-span-full mt-2">
                <button
                  onClick={() => openMap(data.address)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  View Location on Map
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        );
      
      case 'rescue':
        return (
          <>
            {data.image && (
              <div className="col-span-full mb-3">
                <img 
                  src={data.image} 
                  alt={data.animalType || 'Rescue Animal'} 
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
            <DataField icon={User} label="Reporter Name" value={data.name} />
            <DataField icon={Home} label="Address" value={data.address} />
            <DataField icon={Phone} label="Phone" value={data.phone} />
            <DataField icon={MapPin} label="Location" value={data.manualLocation} />
            <DataField icon={PawPrint} label="Animal Type" value={data.animalType} />
            <DataField icon={Ambulance} label="Emergency" value={data.isEmergency} />
            {data.createdAt && <DataField icon={Calendar} label="Reported On" value={new Date(data.createdAt).toLocaleDateString()} />}
            {data.location && (
              <div className="col-span-full mt-2">
                <button
                  onClick={() => openMap(data.location)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        );
      
      case 'donation':
        return (
          <>
            <DataField icon={User} label="Donor Name" value={data.fullName} />
            <DataField icon={Mail} label="Email" value={data.email} />
            <DataField icon={Phone} label="Phone" value={data.phone} />
            <DataField icon={DollarSign} label="Amount" value={data.amount ? `₹${parseFloat(data.amount).toFixed(2)}` : 'N/A'} />
            <DataField icon={MessageCircle} label="Message" value={data.message} />
            <DataField icon={Calendar} label="Payment Method" value={data.paymentMethod} />
            {data.transactionId && <DataField icon={Calendar} label="Transaction ID" value={data.transactionId} />}

            {data.createdAt && <DataField icon={Calendar} label="Donated On" value={new Date(data.createdAt).toLocaleDateString()} />}
          </>
        );
      
      default:
        return <p className="text-gray-500">Unknown data type</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DataCard;