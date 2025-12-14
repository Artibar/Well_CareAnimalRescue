import React, { useState, useEffect } from 'react';
import { AlertCircle, Search, Filter, RefreshCw, PawPrint, Users, Ambulance, Heart, User, Phone, Mail, Home, Calendar, MapPin, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';
import DataCard from "../../component/DataCard"
import OverviewDashboard from '../../component/OverviewDashboard';
import HomePageAnimals from "../../component/HomePageAnimals"
import { Link } from 'react-router-dom';
import axios from 'axios';
const Dashboard= ({ 
  type = 'overview',
  apiUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '',
  title = 'Dashboard'
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (apiUrl && type !== 'overview' && type !== 'home-animals') {
      fetchData();
    }
  }, [apiUrl, type]);

  useEffect(() => {
    filterData();
  }, [searchTerm, filterType, data]);

  const fetchData = async () => {
  if (!apiUrl) {
    setError('API URL is not configured');
    setIsLoading(false);
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    console.log('Fetching from:', apiUrl);

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log('Response status:', response.status);

    if (![200, 201].includes(response.status)) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    const result = response.data; // no need for await
    console.log('Raw API Response:', result);

    let fetchedData = [];

    if (Array.isArray(result)) {
      fetchedData = result;
    } else if (Array.isArray(result.data)) {
      fetchedData = result.data;
    } else if (Array.isArray(result[type])) {
      fetchedData = result[type];
    } else if (Array.isArray(result.adoptions)) {
      fetchedData = result.adoptions;
    } else if (Array.isArray(result.volunteers)) {
      fetchedData = result.volunteers;
    } else if (Array.isArray(result.rescues)) {
      fetchedData = result.rescues;
    } else if (Array.isArray(result.donations)) {
      fetchedData = result.donations;
    }

    console.log('Processed data:', fetchedData);
    setData(fetchedData);
    setFilteredData(fetchedData);
    setError(null);

  } catch (err) {
    console.error('Fetch Error:', err);

    let errorMessage = 'Failed to fetch data';
    if (err.response) {
      errorMessage = `Server responded with ${err.response.status}: ${err.response.statusText}`;
    } else if (err.request) {
      errorMessage = 'No response received from server. Check backend and network.';
    } else {
      errorMessage = err.message;
    }

    setError(errorMessage);
    setData([]);
    setFilteredData([]);
  } finally {
    setIsLoading(false);
  }
};


  const filterData = () => {
    let filtered = [...data];

    if (filterType !== 'all' && (type === 'adoption' || type === 'rescue')) {
      filtered = filtered.filter(item => 
        item.animalType?.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.includes(searchTerm) ||
        item.animalType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const getStats = () => {
    const stats = { total: data.length };
    
    if (type === 'adoption' || type === 'rescue') {
      data.forEach(item => {
        const animalType = item.animalType || 'Unknown';
        stats[animalType] = (stats[animalType] || 0) + 1;
      });
    } else if (type === 'donation') {
      stats.totalAmount = data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    }
    
    return stats;
  };

  const getIcon = () => {
    switch(type) {
      case 'adoption': return PawPrint;
      case 'volunteer': return Users;
      case 'rescues': return Ambulance;
      case 'donation': return Heart;
      default: return TrendingUp;
    }
  };

  const stats = getStats();
  const Icon = getIcon();

  if (type === 'home-animals') {
    return <HomePageAnimals />;
  }

  if (type === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
            <div className="flex items-center gap-20 justify-between">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />
             <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Dashboard Overview</h1>
                <p className="text-sm sm:text-base opacity-90 mt-1">Well Care Animal Rescue - Complete Statistics</p>
               
              </div>
              <div className='flex items-end justify-end'>
               <Link to='/logout' className='bg-transparent text-white rounded font-bold'>Logout</Link>
            </div>
            </div>
          </div>
          <OverviewDashboard />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">Loading data...</p>
        </div>
      </div>
    );
  }

  if (!apiUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">API URL Not Set</h2>
          <p className="text-gray-600 text-sm sm:text-base">Please provide an API URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {type.charAt(0).toUpperCase() + type.slice(1)} Records
              </h1>
              <p className="text-xs sm:text-sm md:text-base opacity-90 mt-1">
                {type === 'adoption' && 'View and manage all adoption applications'}
                {type === 'volunteer' && 'View and manage all volunteer registrations'}
                {type === 'rescue' && 'View and manage all rescue requests'}
                {type === 'donation' && 'View and manage all donation records'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Statistics</h2>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 text-xs sm:text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-semibold text-sm">Error</p>
                  <p className="text-red-700 text-xs">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 text-white">
              <p className="text-xs sm:text-sm opacity-90">Total Records</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            
            {type === 'donation' && stats.totalAmount !== undefined && (
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white">
                <p className="text-xs sm:text-sm opacity-90">Total Amount</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">₹{stats.totalAmount.toFixed(2)}</p>
              </div>
            )}
            
            {(type === 'adoption' || type === 'rescue') && Object.entries(stats)
              .filter(([key]) => key !== 'total')
              .slice(0, 3)
              .map(([animalType, count]) => (
                <div key={animalType} className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm opacity-90 truncate">{animalType}</p>
                  <p className="text-2xl sm:text-3xl font-bold mt-1">{count}</p>
                </div>
              ))
            }
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {(type === 'adoption' || type === 'rescue') && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="all">All Animal Types</option>
                  {Object.keys(stats).filter(key => key !== 'total').map(animalType => (
                    <option key={animalType} value={animalType}>{animalType}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Showing {filteredData.length} of {data.length} records
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
              <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">No records found</p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <DataCard key={item._id || index} data={item} type={type} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;