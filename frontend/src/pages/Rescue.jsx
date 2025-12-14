import React, { useRef } from 'react';
import { AlertCircle, MapPin, Upload, Phone, User, Home, Camera, Check, X, PawPrint, AlertTriangle, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useRescueStore from '../store/useRescueStore.js';
import Navbar from '../component/Navbar.jsx';
import RescueOp1 from '../assets/RescueOp1.jpeg';
import RescueOp from '../assets/RescueOp.jpeg';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer.jsx'

const Rescue = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {
    formData,
    liveLocation,
    imagePreview,
    errors,
    locationLoading,
    submitStatus,
    updateFormField,
    setImage,
    removeImage,
    getLiveLocation,
    submitRescueForm,
  } = useRescueStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormField(name, type === "checkbox" ? checked : value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    removeImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitRescueForm();

    if (result.success) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      navigate("/rescuePage");
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${RescueOp})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl animate-fade-in">
              Help Us Rescue Animals In Need
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-6 sm:mb-8 font-medium drop-shadow-lg px-4">
              Every day, we rescue animals from dangerous situations, neglect and abandonment. Your support makes these rescues possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
              <Link 
                to='/rescue' 
                className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 shadow-xl text-center"
              >
                Report an Animal
              </Link>
              <Link 
                to='/donate' 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-center"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Hotline Section */}
      <section className="py-8 sm:py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">Found an Injured or Stray Animal?</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Call our 24/7 emergency hotline for immediate assistance.
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">(555) 911-PAWS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Rescue Process Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-4 sm:mb-6">
                The Animal Rescue Process
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                The process begins the moment we receive a call about an animal in distress. Whether it's an abandoned pet, a stray wandering the streets, or an animal suffering from neglect or abuse, our emergency response team springs into action. We coordinate with local animal control, concerned citizens, and law enforcement to safely retrieve the animal.
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-green-900 text-center mb-6 sm:mb-8">
                Rescue Operation
              </h3>

              <img 
                src={RescueOp1} 
                alt="Rescue Operation" 
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Our Rescue Process
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Intake & Assessment",
                    description: "Every animal receives a thorough medical examination and behavioral assessment.",
                  },
                  {
                    step: "2",
                    title: "Medical Care",
                    description: "We provide vaccinations, spay/neuter surgery, and any necessary treatments.",
                  },
                  {
                    step: "3",
                    title: "Quarantine & Observation",
                    description: "This crucial period allows us to monitor for any contagious diseases, behavior and temperament."
                  },
                  {
                    step: "4",
                    title: "Rehabilitation & Socialization",
                    description: "Animals receive socialization, training, and emotional recovery support.",
                  },
                  {
                    step: "5",
                    title: "Foster Care",
                    description: "We find temporary homes for animals, where they experience normal life.",
                  },
                  {
                    step: "6",
                    title: "Up for Adoption",
                    description: "When an animal is medically cleared and behaviorally ready, we prepare them for adoption.",
                  },
                  {
                    step: "7",
                    title: "Adoption Matching",
                    description: "We carefully match and find families for adoption.",
                  },
                  {
                    step: "8",
                    title: "Adoption & Beyond",
                    description: "We maintain contact with adopters, offering guidance. If circumstances change, we take the animal back.",
                  },
                  {
                    step: "9",
                    title: "Follow Up",
                    description: "We check in with adoptive families regularly during the first few months to ensure smooth transition.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foster Parent Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Become a Foster Parent
              </h2>
              <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                Foster homes are critical to our rescue mission. By opening your home temporarily, you help animals heal and prepare for adoption.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "We provide all supplies and medical care",
                  "24/7 support from our team",
                  "Flexible commitment options",
                  "First right to adopt your foster",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Emergency Banner */}
              {formData.isEmergency && (
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 animate-pulse">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-center">Emergency Mode Active - Priority Response</span>
                </div>
              )}

              <div className="p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  
                  {/* Personal Information Section */}
                  <div className="pb-6 border-b-2 border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Information</h2>
                    <p className="text-gray-600 text-sm sm:text-base">We'll use this to contact you about the rescue</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name Field */}
                    <div className="sm:col-span-1">
                      <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                        <User className="w-4 h-4 mr-2 text-green-600" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="sm:col-span-1">
                      <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 mr-2 text-green-600" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="+91 Enter your phone"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                      <Home className="w-4 h-4 mr-2 text-green-600" />
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 resize-none text-sm sm:text-base ${
                        errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your complete address with landmark"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Animal Type Field */}
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                      <PawPrint className="w-4 h-4 mr-2 text-green-600" />
                      Animal Type *
                    </label>
                    <input
                      type="text"
                      name="animalType"
                      value={formData.animalType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                        errors.animalType ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="e.g., Dog, Cat, Bird"
                    />
                    {errors.animalType && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.animalType}
                      </p>
                    )}
                  </div>

                  {/* Location Section */}
                  <div className="pb-6 border-b-2 border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Animal Location</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Help us locate the animal quickly</p>
                  </div>

                  {/* Live Location */}
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      GPS Location
                    </label>
                    <button
                      type="button"
                      onClick={getLiveLocation}
                      disabled={locationLoading}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      {locationLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Getting Location...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-5 h-5" />
                          <span>{liveLocation ? 'Update Location' : 'Capture Current Location'}</span>
                        </>
                      )}
                    </button>
                    {liveLocation && (
                      <div className="mt-3 sm:mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-green-800">Location Captured Successfully</p>
                          <p className="text-xs text-green-600 mt-1 break-all">
                            Lat: {liveLocation.latitude.toFixed(6)}, Long: {liveLocation.longitude.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Manual Location */}
                  <div>
                    <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      Additional Location Details *
                    </label>
                    <input
                      type="text"
                      name="manualLocation"
                      value={formData.manualLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 hover:border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base"
                      placeholder="Near park gate, behind shop, etc."
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="pb-6 border-b-2 border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Animal Photo</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Upload a clear photo to help us assess the situation</p>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {!imagePreview ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="w-full px-6 py-8 sm:py-10 border-3 border-dashed border-gray-300 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 text-gray-600 hover:text-green-600 group"
                      >
                        <div className="p-4 sm:p-5 bg-gray-100 group-hover:bg-green-100 rounded-full transition-colors duration-300">
                          <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-base sm:text-lg mb-1">Click to upload animal photo</p>
                          <p className="text-xs sm:text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Animal preview"
                          className="w-full h-56 sm:h-64 lg:h-72 object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-2xl"></div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-3 right-3 p-2 sm:p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-3 right-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-50 text-gray-800 rounded-xl transition-all duration-300 shadow-lg font-bold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Upload className="w-4 h-4" />
                          Change Photo
                        </button>
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Emergency Checkbox */}
                  <div
                    onClick={() => updateFormField('isEmergency', !formData.isEmergency)}
                    className={`cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                      formData.isEmergency
                        ? 'bg-red-50 border-red-300 shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <input
                        type="checkbox"
                        name="isEmergency"
                        checked={formData.isEmergency}
                        onChange={handleInputChange}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 focus:ring-red-500 rounded mt-0.5 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-1">
                        <label className="flex items-center gap-2 font-bold text-gray-900 cursor-pointer text-sm sm:text-base">
                          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${formData.isEmergency ? 'text-red-600' : 'text-gray-400'}`} />
                          This is an emergency case
                        </label>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
                          Check this if the animal is severely injured, trapped, or in immediate danger
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus?.type === 'loading'}
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitStatus?.type === 'loading' ? 'Submitting...' : 'Submit Rescue Request'}
                  </button>

                  {/* Status Message */}
                  {submitStatus && (
                    <div
                      className={`p-4 sm:p-5 rounded-2xl flex items-start gap-3 animate-in shadow-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 border-2 border-green-200'
                          : submitStatus.type === 'loading'
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-red-50 border-2 border-red-200'
                      }`}
                    >
                      {submitStatus.type === 'success' ? (
                        <Check className="w-6 h-6 text-green-600 shrink-0" />
                      ) : submitStatus.type === 'loading' ? (
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-red-600 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p
                          className={`font-bold text-sm sm:text-base ${
                            submitStatus.type === 'success'
                              ? 'text-green-800'
                              : submitStatus.type === 'loading'
                              ? 'text-blue-800'
                              : 'text-red-800'
                          }`}
                        >
                          {submitStatus.type === 'success' ? 'Success!' : submitStatus.type === 'loading' ? 'Submitting...' : 'Error'}
                        </p>
                        <p
                          className={`text-xs sm:text-sm mt-1 ${
                            submitStatus.type === 'success'
                              ? 'text-green-700'
                              : submitStatus.type === 'loading'
                              ? 'text-blue-700'
                              : 'text-red-700'
                          }`}
                        >
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105">
            <div className="inline-block p-4 sm:p-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">Quick Response</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Thank you for reaching out! Our team has been alerted and will get back to you shortly.
            </p>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105">
            <div className="inline-block p-4 sm:p-5 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">24/7 Available</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Emergency rescue available anytime, day or night
            </p>
          </div>
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="inline-block p-4 sm:p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">GPS Tracking</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Precise location helps us reach faster
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Rescue;