import Dashboard from "../Admin/Dashboard"
import { useEffect } from "react";
import { Trash, Mail, Phone, User, DollarSign, CreditCard, Calendar, AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import useDonationStore from "../../store/useDonationStore.js";

const AdminDonation = () => {
  // Get state and actions from Donation Store
  const {
    donationList,
    isLoadingDonations,
    donationsError,
    fetchDonationList,
    deleteDonation,
    getDonationStats,
  } = useDonationStore();

  // Fetch donations on mount
  useEffect(() => {
    fetchDonationList();
  }, [fetchDonationList]);

  const handleDelete = async (id) => {
    await deleteDonation(id);
  };

  const handleRefresh = () => {
    fetchDonationList();
  };

  // Get statistics
  const stats = getDonationStats();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get payment method badge color
  const getPaymentBadgeColor = (method) => {
    const colors = {
      upi: 'bg-purple-100 text-purple-700',
      card: 'bg-blue-100 text-blue-700',
      netbanking: 'bg-green-100 text-green-700',
      cash: 'bg-orange-100 text-orange-700'
    };
    return colors[method] || 'bg-gray-100 text-gray-700';
  };
  const BaseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Card */}
        <div className="mb-8">
          <Dashboard
            type="donation"
            apiUrl={`${BaseUrl}/razorpay/get-donations`}
            title="Donation Dashboard"
          />
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Donation Dashboard
                </h1>
                <button
                  onClick={handleRefresh}
                  disabled={isLoadingDonations}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingDonations ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <p className="text-gray-600">
                Manage and track all donations received
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Donations */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg">
              <p className="text-xs font-medium opacity-90 mb-1">Total Donations</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
              <p className="text-xs font-medium opacity-90 mb-1">Total Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</p>
            </div>

            {/* Today's Donations */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
              <p className="text-xs font-medium opacity-90 mb-1">Today</p>
              <p className="text-3xl font-bold">{stats.today}</p>
              <p className="text-xs opacity-90 mt-1">{formatCurrency(stats.todayAmount)}</p>
            </div>

            {/* Average Amount */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
              <p className="text-xs font-medium opacity-90 mb-1">Avg. Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.averageAmount)}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingDonations && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading donations...</p>
          </div>
        )}

        {/* Error State */}
        {donationsError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-red-800 mb-1">Error Loading Data</h3>
              <p className="text-red-700">{donationsError}</p>
              <button
                onClick={fetchDonationList}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingDonations && !donationsError && donationList.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <DollarSign className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Donations Yet</h3>
            <p className="text-gray-600">There are currently no donations to display.</p>
          </div>
        )}

        {/* Donation List */}
        {!isLoadingDonations && !donationsError && donationList.length > 0 && (
          <div className="space-y-4">
            {donationList.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    {/* Left Side - Donor Info */}
                    <div className="flex-1 space-y-4">
                      {/* Name & Amount */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-lg shrink-0">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Donor Name</p>
                            <p className="text-xl font-bold text-gray-800">{donation.fullName}</p>
                          </div>
                        </div>

                        {/* Amount Badge */}
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl">
                          <p className="text-xs opacity-90">Amount</p>
                          <p className="text-2xl font-bold">{formatCurrency(donation.amount)}</p>
                        </div>
                      </div>

                      {/* Contact Info Row */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-500 font-medium">Email</p>
                            <a
                              href={`mailto:${donation.email}`}
                              className="text-sm text-blue-600 hover:underline break-all"
                            >
                              {donation.email}
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
                              href={`tel:${donation.phone}`}
                              className="text-sm text-purple-600 hover:underline"
                            >
                              {donation.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
                          <CreditCard className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium mb-2">Payment Method</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentBadgeColor(donation.paymentMethod)}`}>
                              {donation.paymentMethod.toUpperCase()}
                            </span>
                            {donation.upiId && (
                              <span className="text-sm text-gray-600">
                                ({donation.upiId})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Message (if available) */}
                      {donation.message && (
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                          <div className="p-2 bg-pink-100 rounded-lg shrink-0">
                            <MessageSquare className="w-5 h-5 text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 font-medium">Message</p>
                            <p className="text-sm text-gray-700 italic mt-1">"{donation.message}"</p>
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm pt-2 border-t border-gray-100">
                        <Calendar className="w-4 h-4" />
                        <span>Donated: {new Date(donation.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}</span>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleDelete(donation._id)}
                        className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors group"
                        title="Delete donation"
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

export default AdminDonation;