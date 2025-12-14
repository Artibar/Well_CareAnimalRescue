
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL =  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const useRescueStore = create(
  persist(
    (set, get) => ({
      
      formData: {
        name: "",
        phone: "",
        address: "",
        animalType: "",
        manualLocation: "",
        isEmergency: false,
        image: null,
      },
      liveLocation: null,
      imagePreview: null,
      errors: {},
      
      // ==================== UI STATE ====================
      locationLoading: false,
      submitStatus: null,
      
      // ==================== ADMIN STATE ====================
      rescueList: [],
      isLoadingRescues: false,
      rescuesError: null,

      // ==================== FORM ACTIONS ====================
      
      // Update single form field
      updateFormField: (name, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: value
          },
          errors: {
            ...state.errors,
            [name]: "" // Clear error when field is updated
          }
        }));
      },

      // Update multiple fields at once
      updateMultipleFields: (fields) => {
        set((state) => ({
          formData: {
            ...state.formData,
            ...fields
          }
        }));
      },

      // Handle image upload
      setImage: (file) => {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
          set((state) => ({
            errors: {
              ...state.errors,
              image: 'File size must be less than 5MB'
            }
          }));
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          set((state) => ({
            formData: {
              ...state.formData,
              image: file
            },
            imagePreview: reader.result,
            errors: {
              ...state.errors,
              image: ""
            }
          }));
        };
        reader.readAsDataURL(file);
      },

      // Remove image
      removeImage: () => {
        set((state) => ({
          formData: {
            ...state.formData,
            image: null
          },
          imagePreview: null
        }));
      },

      // Set errors
      setErrors: (errors) => {
        set({ errors });
      },

      // Clear specific error
      clearError: (fieldName) => {
        set((state) => ({
          errors: {
            ...state.errors,
            [fieldName]: ""
          }
        }));
      },

      // ==================== LOCATION ACTIONS ====================
      
      // Get live location
      getLiveLocation: () => {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser');
          return;
        }

        set({ locationLoading: true });

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            set({
              liveLocation: location,
              locationLoading: false
            });
          },
          (error) => {
            alert("Unable to retrieve location: " + error.message);
            set({ locationLoading: false });
          }
        );
      },

      // ==================== FORM VALIDATION ====================
      
      validateForm: () => {
        const { formData } = get();
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.animalType.trim()) newErrors.animalType = "Animal type is required";

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      // ==================== FORM SUBMISSION ====================
      
      submitRescueForm: async () => {
        const { formData, liveLocation, validateForm } = get();

        if (!validateForm()) return { success: false };

        set({
          submitStatus: {
            type: "loading",
            message: "Submitting rescue request"
          }
        });

        try {
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("phone", formData.phone);
          formDataToSend.append("address", formData.address);
          formDataToSend.append("animalType", formData.animalType);
          formDataToSend.append("manualLocation", formData.manualLocation);
          formDataToSend.append("isEmergency", formData.isEmergency.toString());

          if (liveLocation) {
            formDataToSend.append("liveLocation", JSON.stringify(liveLocation));
          }

          if (formData.image) {
            formDataToSend.append("animalImage", formData.image);
          }

          const response = await axios.post(
            `${API_BASE_URL}/rescues/create`,
            formDataToSend, {
              headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          if (response.data.success) {
            set({
              submitStatus: {
                type: "success",
                message: "Rescue request submitted successfully! Our team will contact you soon."
              }
            });

            // Reset form
            get().resetForm();

            // Clear status after 5 seconds
            setTimeout(() => {
              set({ submitStatus: null });
            }, 5000);

            return { success: true, data: response.data };
          } else {
            throw new Error(response.data.message || "Submission failed");
          }
        } catch (error) {
          console.error("Submission error:", error);

          let errorMessage = "Failed to submit. Please try again.";

          if (error.response) {
            errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
          } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
          } else {
            errorMessage = error.message || errorMessage;
          }

          set({
            submitStatus: {
              type: "error",
              message: errorMessage
            }
          });

          return { success: false, error: errorMessage };
        }
      },

      // ==================== FORM RESET ====================
      
      resetForm: () => {
        set({
          formData: {
            name: "",
            phone: "",
            address: "",
            animalType: "",
            manualLocation: "",
            isEmergency: false,
            image: null,
          },
          liveLocation: null,
          imagePreview: null,
          errors: {},
          submitStatus: null
        });
      },

      // ==================== ADMIN ACTIONS ====================
      
      // Fetch all rescue requests
      fetchRescueList: async () => {
        set({ isLoadingRescues: true, rescuesError: null });

        try {
          const response = await axios.get(`${API_BASE_URL}/rescues/get`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = response.data;

          console.log("Backend Response:", data);

          if (data.success) {
            set({
              rescueList: data.rescues || data.data || [],
              isLoadingRescues: false
            });
          } else {
            throw new Error(data.message || "Failed to fetch rescues");
          }
        } catch (error) {
          console.error("Fetch rescue error:", error);
          set({
            rescuesError: error.message,
            isLoadingRescues: false
          });
        }
      },

      // Open location in Google Maps
      openMap: (location) => {
        if (!location) return;

        // If manual location is a string address
        if (typeof location === "string") {
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
            "_blank"
          );
          return;
        }

        // If location is object { latitude, longitude }
        const { latitude, longitude } = location;
        if (latitude && longitude) {
          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        }
      },

      // Get image URL helper
      getImageURL: (imagePath) => {
        return imagePath ? `${API_BASE_URL}/uploads/${imagePath}` : null;
      }
    }),
    {
      name: 'rescue-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields (not loading states or errors)
        rescueList: state.rescueList,
      }),
    }
  )
);

export default useRescueStore;