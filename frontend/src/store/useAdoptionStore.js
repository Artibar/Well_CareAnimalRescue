// store/useAdoptionStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const useAdoptionStore = create(
  persist(
    (set, get) => ({

      adoptionForm: {
        name: "",
        email: "",
        phone: "",
        address: "",
        animalType: ""
      },


      adoptionErrors: {},
      isLoadingAdoption: false,
      adoptionSubmitSuccess: false,

      //admin adoption data
      adoptionList: [],
      isLoadingAdoptions: false,
      adoptionsError: null,

      updateAdoptionField: (name, value) => {
        set((state) => ({
          adoptionForm: {
            ...state.adoptionForm,
            [name]: value
          },
          adoptionErrors: {
            ...state.adoptionErrors,
            [name]: "" // Clear error when field is updated
          }
        }));
      },


      updateMultipleAdoptionFields: (fields) => {
        set((state) => ({
          adoptionForm: {
            ...state.adoptionForm,
            ...fields
          }
        }));
      },


      setAdoptionErrors: (errors) => {
        set({ adoptionErrors: errors });
      },


      clearAdoptionError: (fieldName) => {
        set((state) => ({
          adoptionErrors: {
            ...state.adoptionErrors,
            [fieldName]: ""
          }
        }));
      },

      validateAdoptionForm: () => {
        const { adoptionForm } = get();
        const newErrors = {};

        if (!adoptionForm.name.trim()) {
          newErrors.name = "Name is required";
        }

        if (!adoptionForm.phone.trim()) {
          newErrors.phone = "Phone is required";
        } else if (!/^[6-9]\d{9}$/.test(adoptionForm.phone.replace(/\D/g, ''))) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!adoptionForm.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(adoptionForm.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!adoptionForm.address.trim()) {
          newErrors.address = "Address is required";
        }

        if (!adoptionForm.animalType.trim()) {
          newErrors.animalType = "Animal name or category is required";
        }

        set({ adoptionErrors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      // ==================== FORM SUBMISSION ====================

      submitAdoptionForm: async () => {
        const { adoptionForm, validateAdoptionForm } = get();

        // Validate form first
        if (!validateAdoptionForm()) {
          return { success: false, error: "Please fix the form errors" };
        }

        set({ isLoadingAdoption: true });

        try {
          const response = await axios.post(
            `${API_BASE_URL}/adoption/create`,
            adoptionForm,
            {
              headers: {
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          if (response.status === 200 || response.status === 201) {
            // Set success state
            set({
              adoptionSubmitSuccess: true,
              isLoadingAdoption: false
            });

            // Show success message
            alert("Adoption request submitted successfully!");

            // Reset form
            get().resetAdoptionForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
              set({ adoptionSubmitSuccess: false });
            }, 3000);

            return { success: true, data: response.data };
          } else {
            throw new Error(response.data.message || "Failed to submit adoption request");
          }
        } catch (error) {
          console.error("Error creating adoption request:", error);

          let errorMessage = "An error occurred. Please try again later.";

          if (error.response) {
            errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
          } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
          } else {
            errorMessage = error.message || errorMessage;
          }

          alert(errorMessage);

          set({ isLoadingAdoption: false });

          return { success: false, error: errorMessage };
        }
      },



      resetAdoptionForm: () => {
        set({
          adoptionForm: {
            name: "",
            email: "",
            phone: "",
            address: "",
            animalType: ""
          },
          adoptionErrors: {},
          isLoadingAdoption: false
        });
      },



      // Fetch all adoption requests
      fetchAdoptionList: async () => {
        set({ isLoadingAdoptions: true, adoptionsError: null });

        try {
          const response = await axios.get(`${API_BASE_URL}/adoption/get`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          const data = response.data;

          console.log("Adoption API Response:", data);

          if (data.success) {
            set({
              adoptionList: data.adoption || [],
              isLoadingAdoptions: false
            });
          } else {
            throw new Error(data.message || "Failed to fetch adoptions");
          }
        } catch (error) {
          console.error("Fetch adoption error:", error);
          set({
            adoptionsError: error.message,
            isLoadingAdoptions: false
          });
        }
      },

      // Delete adoption request
      deleteAdoption: async (id) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this adoption request?"
        );

        if (!confirmDelete) {
          return { success: false, cancelled: true };
        }

        try {
          const response = await axios.delete(`${API_BASE_URL}/adoption/${id}`, {
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          });

          const data = response.data;

          if (data.success) {
            // Remove from list
            set((state) => ({
              adoptionList: state.adoptionList.filter(item => item._id !== id)
            }));

            return { success: true };
          } else {
            const errorMsg = data.message || data.error || "Unknown error";
            alert("Failed to delete: " + errorMsg);
            return { success: false, error: errorMsg };
          }
        } catch (error) {
          console.error("Delete error:", error);
          alert("Network error while deleting");
          return { success: false, error: error.message };
        }
      },

      // Update adoption status (if you add this feature later)
      updateAdoptionStatus: async (id, status) => {
        try {
          const response = await axios.patch(`${API_BASE_URL}/adoption/${id}/status`, {
            headers: {
              Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            data: { status }
          });

          const data = response.data;

          if (data.success) {
            // Update in list
            set((state) => ({
              adoptionList: state.adoptionList.map(item =>
                item._id === id ? { ...item, status } : item
              )
            }));

            return { success: true };
          } else {
            throw new Error(data.message || "Failed to update status");
          }
        } catch (error) {
          console.error("Update status error:", error);
          alert(error.message);
          return { success: false, error: error.message };
        }
      },

      // Refresh adoption list
      refreshAdoptionList: () => {
        get().fetchAdoptionList();
      },

      // ==================== UTILITY FUNCTIONS ====================

      // Get adoption by ID
      getAdoptionById: (id) => {
        const { adoptionList } = get();
        return adoptionList.find(item => item._id === id);
      },

      // Get adoption statistics
      getAdoptionStats: () => {
        const { adoptionList } = get();
        return {
          total: adoptionList.length,
          today: adoptionList.filter(item => {
            const today = new Date().toDateString();
            return new Date(item.createdAt).toDateString() === today;
          }).length,
          thisWeek: adoptionList.filter(item => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.createdAt) >= weekAgo;
          }).length,
          thisMonth: adoptionList.filter(item => {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return new Date(item.createdAt) >= monthAgo;
          }).length
        };
      },

      // Search adoptions
      searchAdoptions: (query) => {
        const { adoptionList } = get();
        const searchTerm = query.toLowerCase();

        return adoptionList.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.phone.includes(searchTerm) ||
          item.animalType.toLowerCase().includes(searchTerm)
        );
      },

      // Clear all adoption data (use with caution)
      clearAdoptionData: () => {
        const confirm = window.confirm(
          "Are you sure you want to clear all adoption data? This cannot be undone."
        );

        if (confirm) {
          set({
            adoptionList: [],
            adoptionForm: {
              name: "",
              email: "",
              phone: "",
              address: "",
              animalType: ""
            },
            adoptionErrors: {},
            adoptionSubmitSuccess: false
          });
        }
      }
    }),
    {
      name: 'adoption-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        adoptionList: state.adoptionList,
      }),
    }
  )
);

export default useAdoptionStore;