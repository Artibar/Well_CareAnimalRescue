import { useState, useEffect } from "react";
import { PawPrint, Users, Ambulance, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import axios from 'axios'
const OverviewDashboard = () => {
  const [adoptionData, setAdoptionData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [rescueData, setRescueData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL =  import.meta.env.MODE === 'development' ?'http://localhost:3000':'';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching all data from:', BASE_URL);

      const [adoptionsRes, volunteersRes, rescuesRes, donationsRes] = await Promise.all([
        axios.get(`${BASE_URL}/adoption/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(r => {
          console.log('Adoptions response status:', r.status);
          return r.data;
        }).then(data => {
          return data.adoption || [];
        })
          .catch(err => {
            console.error('Adoptions fetch error:', err);
            return [];
          }),
        axios.get(`${BASE_URL}/volunteer/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(r => {
          console.log('Volunteers response status:', r.status);
          return r.data;
        }).catch(err => {
          console.error('Volunteers fetch error:', err);
          return [];
        }),
        axios.get(`${BASE_URL}/rescues/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(r => {
          console.log('Rescues response status:', r.status);
          return r.data;
        }).catch(err => {
          console.error('Rescues fetch error:', err);
          return [];
        }),
        axios.get(`${BASE_URL}/razorpay/get-donations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(r => {
          console.log('Donations response status:', r.status);
          return r.data;
        }).catch(err => {
          console.error('Donations fetch error:', err);
          return [];
        }),
      ]);

      console.log('Adoptions response:', adoptionsRes);
      console.log('Volunteers response:', volunteersRes);
      console.log('Rescues response:', rescuesRes);
      console.log('Donations response:', donationsRes);

      const adoptions = Array.isArray(adoptionsRes) ? adoptionsRes : (adoptionsRes.data || adoptionsRes.adoptions || []);
      const volunteers = Array.isArray(volunteersRes) ? volunteersRes : (volunteersRes.data || volunteersRes.volunteers || []);
      const rescues = Array.isArray(rescuesRes) ? rescuesRes : (rescuesRes.data || rescuesRes.rescues || []);
      const donations = Array.isArray(donationsRes) ? donationsRes : (donationsRes.data || donationsRes.donations || []);

      console.log('Processed adoptions:', adoptions.length);
      console.log('Processed volunteers:', volunteers.length);
      console.log('Processed rescues:', rescues.length);
      console.log('Processed donations:', donations.length);

      setAdoptionData(adoptions);
      setVolunteerData(volunteers);
      setRescueData(rescues);
      setDonationData(donations);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalDonations = donationData.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <PawPrint className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="text-xs sm:text-sm opacity-90">Adoptions</p>
          </div>
          <Link to="/admin-adoption"><p className="text-3xl sm:text-4xl font-bold">{adoptionData.length}</p></Link>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="text-xs sm:text-sm opacity-90">Volunteers</p>
          </div>
          <Link to='/admin-volunteer'> <p className="text-3xl sm:text-4xl font-bold">{volunteerData.length}</p></Link>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Ambulance className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="text-xs sm:text-sm opacity-90">Rescues</p>
          </div>
          <Link to='/admin-rescue'> <p className="text-3xl sm:text-4xl font-bold">{rescueData.length}</p></Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="text-xs sm:text-sm opacity-90">Donations</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">₹{totalDonations.toFixed(2)}</p>
          <Link to='/admin-donation'><p className="text-xs opacity-75 mt-1">{donationData.length} donations</p></Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <PawPrint className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Adoption Applications</p>
              <p className="text-xl font-bold text-gray-800">{adoptionData.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Registered Volunteers</p>
              <p className="text-xl font-bold text-gray-800">{volunteerData.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <Ambulance className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Rescue Requests</p>
              <p className="text-xl font-bold text-gray-800">{rescueData.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Heart className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Total Donations Received</p>
              <p className="text-xl font-bold text-gray-800">₹{totalDonations.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverviewDashboard;
