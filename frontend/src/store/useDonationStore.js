
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL =  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const useDonationStore = create(
  persist(
    (set, get) => ({
      // ==================== DONATION FORM STATE ====================
      donationForm: {
        fullName: '',
        email: '',
        phone: '',
        amount: '',
        message: '',
        paymentMethod: '',
        upiId: ''
      },

      // ==================== UI STATE ====================
      donationErrors: {},
      isLoadingDonation: false,
      donationSubmitSuccess: false,

      // ==================== ADMIN STATE ====================
      donationList: [],
      isLoadingDonations: false,
      donationsError: null,

      // ==================== FORM ACTIONS ====================

      // Update single field
      updateDonationField: (name, value) => {
        set((state) => ({
          donationForm: {
            ...state.donationForm,
            [name]: value
          },
          donationErrors: {
            ...state.donationErrors,
            [name]: "" // Clear error when field is updated
          }
        }));
      },

      // Update multiple fields at once
      updateMultipleDonationFields: (fields) => {
        set((state) => ({
          donationForm: {
            ...state.donationForm,
            ...fields
          }
        }));
      },

      // Set errors manually
      setDonationErrors: (errors) => {
        set({ donationErrors: errors });
      },

      // Clear specific error
      clearDonationError: (fieldName) => {
        set((state) => ({
          donationErrors: {
            ...state.donationErrors,
            [fieldName]: ""
          }
        }));
      },

      // ==================== FORM VALIDATION ====================

      validateDonationForm: () => {
        const { donationForm } = get();
        const newErrors = {};

        if (!donationForm.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }

        if (!donationForm.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(donationForm.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!donationForm.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(donationForm.phone.replace(/\D/g, ''))) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!donationForm.amount.trim()) {
          newErrors.amount = "Donation amount is required";
        } else if (isNaN(donationForm.amount) || parseFloat(donationForm.amount) <= 0) {
          newErrors.amount = "Please enter a valid amount";
        }

        if (!donationForm.paymentMethod) {
          newErrors.paymentMethod = "Please select a payment method";
        }

        if (donationForm.paymentMethod === 'upi' && !donationForm.upiId.trim()) {
          newErrors.upiId = "UPI ID is required for UPI payment";
        }

        // message is optional, so no validation needed

        set({ donationErrors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      // ==================== FORM SUBMISSION ====================

      submitDonationForm: async () => {
        const { donationForm, validateDonationForm } = get();

        // Validate form first
        if (!validateDonationForm()) {
          return { success: false, error: "Please fix the form errors" };
        }

        set({ isLoadingDonation: true });

        try {
          const response = await axios.post(
            `${API_BASE_URL}/razorpay/create`,
            {
              fullName: donationForm.fullName,
              email: donationForm.email,
              phone: donationForm.phone,
              amount: parseFloat(donationForm.amount),
              message: donationForm.message,
              paymentMethod: donationForm.paymentMethod,
              upiId: donationForm.upiId
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          if (response.data.success || response.status === 200 || response.status === 201) {
            set({
              donationSubmitSuccess: true,
              isLoadingDonation: false
            });

            alert("Donation submitted successfully! Thank you for your generosity!");

            // Reset form
            get().resetDonationForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
              set({ donationSubmitSuccess: false });
            }, 3000);

            return { success: true, data: response.data };
          } else {
            throw new Error(response.data.message || "Failed to process donation");
          }
        } catch (error) {
          console.error("Error creating donation:", error);

          let errorMessage = "An error occurred. Please try again later.";

          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }

          alert(errorMessage);

          set({ isLoadingDonation: false });

          return { success: false, error: errorMessage };
        }
      },

      // ==================== FORM RESET ====================

      resetDonationForm: () => {
        set({
          donationForm: {
            fullName: '',
            email: '',
            phone: '',
            amount: '',
            message: '',
            paymentMethod: '',
            upiId: ''
          },
          donationErrors: {},
          isLoadingDonation: false
        });
      },

      // ==================== ADMIN ACTIONS ====================

      // Fetch all donations
      fetchDonationList: async () => {
        set({ isLoadingDonations: true, donationsError: null });

        try {
          console.log("🔄 Fetching donations...");

          const response = await axios.get(`${API_BASE_URL}/razorpay/get-donations`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          console.log("📦 Donation API Response:", response.data);

          if (response.data.success && Array.isArray(response.data.donations)) {
            set({
              donationList: response.data.donations || [],
              isLoadingDonations: false
            });
            console.log("✅ Donations loaded:", response.data.donations.length);
          } else {
            console.warn("⚠️ No donations returned from backend");
            set({
              donationList: [],
              isLoadingDonations: false
            });
          }
        } catch (error) {
          console.error("❌ Fetch donation error:", error);
          set({
            donationsError: error.response?.data?.message || error.message,
            isLoadingDonations: false
          });
        }
      },

      // Delete donation
      deleteDonation: async (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this donation record?"
        );

        if (!confirmed) {
          return { success: false, cancelled: true };
        }

        try {
          const response = await axios.delete(`${API_BASE_URL}/razorpay/${id}`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (response.data.success) {
            // Remove from list
            set((state) => ({
              donationList: state.donationList.filter(item => item._id !== id)
            }));

            alert("Donation deleted successfully!");
            return { success: true };
          } else {
            alert("Failed to delete donation");
            return { success: false, error: response.data.message };
          }
        } catch (error) {
          console.error("Delete error:", error);
          const errorMsg = error.response?.data?.message || error.message || "Network error occurred";
          alert("Failed to delete: " + errorMsg);
          return { success: false, error: errorMsg };
        }
      },

      // Update donation status
      updateDonationStatus: async (id, status) => {
        try {
          const response = await axios.patch(
            `${API_BASE_URL}/razorpay/${id}`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          if (response.data.success) {
            // Update in list
            set((state) => ({
              donationList: state.donationList.map(item =>
                item._id === id ? { ...item, status } : item
              )
            }));

            return { success: true };
          } else {
            throw new Error(response.data.message || "Failed to update status");
          }
        } catch (error) {
          console.error("Update status error:", error);
          alert(error.response?.data?.message || error.message);
          return { success: false, error: error.message };
        }
      },

      // Refresh donation list
      refreshDonationList: () => {
        get().fetchDonationList();
      },

      // ==================== UTILITY FUNCTIONS ====================

      // Get donation by ID
      getDonationById: (id) => {
        const { donationList } = get();
        return donationList.find(item => item._id === id);
      },

      // Get donation statistics
      getDonationStats: () => {
        const { donationList } = get();
        
        const totalAmount = donationList.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        
        return {
          total: donationList.length,
          totalAmount: totalAmount,
          averageAmount: donationList.length > 0 ? totalAmount / donationList.length : 0,
          today: donationList.filter(item => {
            const today = new Date().toDateString();
            return new Date(item.createdAt).toDateString() === today;
          }).length,
          todayAmount: donationList
            .filter(item => {
              const today = new Date().toDateString();
              return new Date(item.createdAt).toDateString() === today;
            })
            .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0),
          thisWeek: donationList.filter(item => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.createdAt) >= weekAgo;
          }).length,
          thisMonth: donationList.filter(item => {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return new Date(item.createdAt) >= monthAgo;
          }).length
        };
      },

      // Search donations
      searchDonations: (query) => {
        const { donationList } = get();
        const searchTerm = query.toLowerCase();

        return donationList.filter(item =>
          item.fullName.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.phone.includes(searchTerm) ||
          item.amount.toString().includes(searchTerm)
        );
      },

      // Filter by payment method
      filterByPaymentMethod: (method) => {
        const { donationList } = get();
        return donationList.filter(item => item.paymentMethod === method);
      },

      // Clear all donation data (use with caution)
      clearDonationData: () => {
        const confirm = window.confirm(
          "Are you sure you want to clear all donation data? This cannot be undone."
        );

        if (confirm) {
          set({
            donationList: [],
            donationForm: {
              fullName: '',
              email: '',
              phone: '',
              amount: '',
              message: '',
              paymentMethod: '',
              upiId: ''
            },
            donationErrors: {},
            donationSubmitSuccess: false
          });
        }
      }
    }),
    {
      name: 'donation-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        donationList: state.donationList,
      }),
    }
  )
);

export default useDonationStore;