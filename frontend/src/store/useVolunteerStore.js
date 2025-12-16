// store/useVolunteerStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL =  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'https://well-careanimalrescue.onrender.com';

const useVolunteerStore = create(
  persist(
    (set, get) => ({
      
      volunteerForm: {
        name: "",
        phone: "",
        email: "",
        address: "",
        skills: ""
        
      },

      // ==================== UI STATE ====================
      volunteerErrors: {},
      isLoadingVolunteer: false,
      volunteerSubmitSuccess: false,

      // ==================== ADMIN STATE ====================
      volunteerList: [],
      isLoadingVolunteers: false,
      volunteersError: null,

      // ==================== FORM ACTIONS ====================

      // Update single field
      updateVolunteerField: (name, value) => {
        set((state) => ({
          volunteerForm: {
            ...state.volunteerForm,
            [name]: value
          },
          volunteerErrors: {
            ...state.volunteerErrors,
            [name]: "" // Clear error when field is updated
          }
        }));
      },

      // Update multiple fields at once
      updateMultipleVolunteerFields: (fields) => {
        set((state) => ({
          volunteerForm: {
            ...state.volunteerForm,
            ...fields
          }
        }));
      },

      // Set errors manually
      setVolunteerErrors: (errors) => {
        set({ volunteerErrors: errors });
      },

      // Clear specific error
      clearVolunteerError: (fieldName) => {
        set((state) => ({
          volunteerErrors: {
            ...state.volunteerErrors,
            [fieldName]: ""
          }
        }));
      },

      // ==================== FORM VALIDATION ====================

      validateVolunteerForm: () => {
        const { volunteerForm } = get();
        const newErrors = {};

        if (!volunteerForm.name.trim()) {
          newErrors.name = "Name is required";
        }

        if (!volunteerForm.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(volunteerForm.phone.replace(/\D/g, ''))) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!volunteerForm.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(volunteerForm.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!volunteerForm.address.trim()) {
          newErrors.address = "Address is required";
        }

        if (!volunteerForm.skills.trim()) {
          newErrors.skills = "Skills are required";
        }

        // joinReason is optional, so no validation needed

        set({ volunteerErrors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      // ==================== FORM SUBMISSION ====================

      submitVolunteerForm: async () => {
        const { volunteerForm, validateVolunteerForm } = get();

        // Validate form first
        if (!validateVolunteerForm()) {
          return { success: false, error: "Please fix the form errors" };
        }

        set({ isLoadingVolunteer: true });

        try {
          // ✅ USING AXIOS
          const response = await axios.post(
            `${API_BASE_URL}/volunteer/create`,
            {
              name: volunteerForm.name,
              phone: volunteerForm.phone,
              email: volunteerForm.email,
              address: volunteerForm.address,
              skills: volunteerForm.skills,
              joinReason: volunteerForm.joinReason
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          if (response.data.message || response.status === 200 || response.status === 201) {
            set({
              volunteerSubmitSuccess: true,
              isLoadingVolunteer: false
            });

            alert("Volunteer request submitted successfully!");

            // Reset form
            get().resetVolunteerForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
              set({ volunteerSubmitSuccess: false });
            }, 3000);

            return { success: true, data: response.data };
          } else {
            throw new Error(response.data.message || "Failed to register volunteer request");
          }
        } catch (error) {
          console.error("Error creating volunteer request:", error);

          let errorMessage = "An error occurred. Please try again later.";

          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }

          alert(errorMessage);

          set({ isLoadingVolunteer: false });

          return { success: false, error: errorMessage };
        }
      },

      // ==================== FORM RESET ====================

      resetVolunteerForm: () => {
        set({
          volunteerForm: {
            name: "",
            phone: "",
            email: "",
            address: "",
            skills: "",
            joinReason: ""
          },
          volunteerErrors: {},
          isLoadingVolunteer: false
        });
      },

      // ==================== ADMIN ACTIONS ====================

      // Fetch all volunteer requests
      fetchVolunteerList: async () => {
        set({ isLoadingVolunteers: true, volunteersError: null });

        try {
          console.log("🔄 Fetching volunteers...");

          // ✅ USING AXIOS
          const response = await axios.get(`${API_BASE_URL}/volunteer/get`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          console.log("📦 Volunteer API Response:", response.data);

          if (response.data.success && Array.isArray(response.data.volunteers)) {
            set({
              volunteerList: response.data.volunteers || [],
              isLoadingVolunteers: false
            });
            console.log("✅ Volunteers loaded:", response.data.volunteers.length);
          } else {
            console.warn("⚠️ No volunteers returned from backend");
            set({
              volunteerList: [],
              isLoadingVolunteers: false
            });
          }
        } catch (error) {
          console.error("❌ Fetch volunteer error:", error);
          set({
            volunteersError: error.response?.data?.message || error.message,
            isLoadingVolunteers: false
          });
        }
      },

      // Delete volunteer request
      deleteVolunteer: async (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this volunteer request?"
        );

        if (!confirmed) {
          return { success: false, cancelled: true };
        }

        try {
          // ✅ USING AXIOS
          const response = await axios.delete(`${API_BASE_URL}/volunteer/${id}`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (response.data.success) {
            // Remove from list
            set((state) => ({
              volunteerList: state.volunteerList.filter(item => item._id !== id)
            }));

            alert("Volunteer deleted successfully!");
            return { success: true };
          } else {
            alert("Failed to delete volunteer");
            return { success: false, error: response.data.message };
          }
        } catch (error) {
          console.error("Delete error:", error);
          const errorMsg = error.response?.data?.message || error.message || "Network error occurred";
          alert("Failed to delete: " + errorMsg);
          return { success: false, error: errorMsg };
        }
      },

      // Update volunteer status (if you add this feature later)
      updateVolunteerStatus: async (id, status) => {
        try {
          // ✅ USING AXIOS
          const response = await axios.patch(
            `${API_BASE_URL}/volunteer/update/${id}`,
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
              volunteerList: state.volunteerList.map(item =>
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

      // Refresh volunteer list
      refreshVolunteerList: () => {
        get().fetchVolunteerList();
      },

      // ==================== UTILITY FUNCTIONS ====================

      // Get volunteer by ID
      getVolunteerById: (id) => {
        const { volunteerList } = get();
        return volunteerList.find(item => item._id === id);
      },

      // Get volunteer statistics
      getVolunteerStats: () => {
        const { volunteerList } = get();
        return {
          total: volunteerList.length,
          today: volunteerList.filter(item => {
            const today = new Date().toDateString();
            return new Date(item.createdAt).toDateString() === today;
          }).length,
          thisWeek: volunteerList.filter(item => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.createdAt) >= weekAgo;
          }).length,
          thisMonth: volunteerList.filter(item => {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return new Date(item.createdAt) >= monthAgo;
          }).length
        };
      },

      // Search volunteers
      searchVolunteers: (query) => {
        const { volunteerList } = get();
        const searchTerm = query.toLowerCase();

        return volunteerList.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.phone.includes(searchTerm) ||
          item.skills.toLowerCase().includes(searchTerm) ||
          item.address.toLowerCase().includes(searchTerm)
        );
      },

      // Filter by skills
      filterBySkills: (skills) => {
        const { volunteerList } = get();
        const skillsLower = skills.toLowerCase();

        return volunteerList.filter(item =>
          item.skills.toLowerCase().includes(skillsLower)
        );
      },

      // Clear all volunteer data (use with caution)
      clearVolunteerData: () => {
        const confirm = window.confirm(
          "Are you sure you want to clear all volunteer data? This cannot be undone."
        );

        if (confirm) {
          set({
            volunteerList: [],
            volunteerForm: {
              name: "",
              phone: "",
              email: "",
              address: "",
              skills: "",
              joinReason: ""
            },
            volunteerErrors: {},
            volunteerSubmitSuccess: false
          });
        }
      }
    }),
    {
      name: 'volunteer-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        volunteerList: state.volunteerList,
      }),
    }
  )
);

export default useVolunteerStore;