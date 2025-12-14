import React from 'react';
import { AlertCircle, User, Phone, Mail, Home, PawPrint, CheckCircle, Heart, Shield, Clock, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useAdoptionStore from '../store/useAdoptionStore';
import AdoptionA from '../assets/AdoptionA.jpeg';
import Adoption2 from '../assets/Adoption2.jpeg';
import max from '../assets/max.jpg'
import luna from '../assets/luna.jpg'
import cooper from '../assets/cooper.jpg'
import Daisy from '../assets/Daisy.jpg'
import rocky from  '../assets/rocky.jpg'
import charlie from '../assets/charlie.jpg'
import bella from '../assets/bella.jpg'
import millo from '../assets/millo.jpg'
import successStory from '../assets/successStory.jpeg'
import successStory1 from '../assets/successStory1.jpeg'
import successStory2 from '../assets/successStory2.jpeg'
import successStory3 from '../assets/successStory3.jpeg'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar';

const Adoption = () => {
  const navigate = useNavigate();

  const {
    adoptionForm,
    adoptionErrors,
    isLoadingAdoption,
    adoptionSubmitSuccess,
    updateAdoptionField,
    submitAdoptionForm,
  } = useAdoptionStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateAdoptionField(name, value);
  };

  const adoptionHandle = async (e) => {
    e.preventDefault();
    const result = await submitAdoptionForm();

    if (result.success) {
      navigate("/adoptionPage");
    }
  };

  const adoptionBenefits = [
    {
      icon: Heart,
      title: "Save a Life",
      description: "Give a rescued animal a second chance at happiness"
    },
    {
      icon: Shield,
      title: "Health Guaranteed",
      description: "All animals are vaccinated and health-checked"
    },
    {
      icon: Clock,
      title: "Lifetime Support",
      description: "We're here for you throughout your pet's life"
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Application Review",
      description: "Our team will review your application within 24-48 hours"
    },
    {
      number: "2",
      title: "Meet & Greet",
      description: "We'll contact you to schedule a meet-and-greet with your chosen pet"
    },
    {
      number: "3",
      title: "Home Assessment",
      description: "Complete a brief interview and home assessment"
    },
    {
      number: "4",
      title: "Welcome Home",
      description: "Welcome your new family member home!"
    }
  ];

  // Animals array with images
  const availableAnimals = [
    { name: "Max", type: "Golden Retriever", age: "2 years", image: max },
    { name: "Luna", type: "Tabby Cat", age: "1 year", image: luna },
    { name: "Charlie", type: "Beagle Mix", age: "3 years", image: charlie },
    { name: "Bella", type: "Persian Cat", age: "1.5 years", image: bella },
    { name: "Rocky", type: "German Shepherd", age: "4 years", image: rocky }, 
    { name: "Daisy", type: "Siamese Cat", age: "2 years", image: Daisy }, 
    { name: "Cooper", type: "Labrador", age: "1 year", image: cooper }, 
    { name: "Milo", type: "Orange Tabby", age: "6 months", image: millo }
  ];

  // Success stories array with images
  const successStories = [successStory, successStory1, successStory2, successStory3];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${AdoptionA})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in">
                Adopt a Companion
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium drop-shadow-lg leading-relaxed">
                Browse our adoptable animals and find your new best friend. Each one has been rescued, rehabilitated, and is ready for their forever home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto pt-4">
                <Link 
                  to='/rescue' 
                  className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 shadow-xl text-center text-sm sm:text-base"
                >
                  Report an Animal
                </Link>
                <Link 
                  to='/donate' 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-center text-sm sm:text-base"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Animals Gallery */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Our Adorable Animals
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              These loving companions are waiting for their forever homes. Each one has a unique personality and so much love to give.
            </p>
          </div>

          {/* Animal Grid - NOW WITH REAL IMAGES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {availableAnimals.map((animal, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {/* FIXED: Now showing actual animal images */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
                      Adopt Me
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{animal.name}</h3>
                  <p className="text-sm text-gray-600">{animal.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{animal.age}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {adoptionBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center group hover:scale-105"
                >
                  <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - Story & Image */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  We Heal & Transform Lives
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  Every animal that comes through our doors has a story. They've faced challenges, but with love, care, and dedication, we help them heal. Now, we want to see them experience the world through the eyes of loving pet parents like you.
                </p>
                
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img 
                    src={Adoption2} 
                    alt="Happy adopted pets" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                    <p className="text-white font-bold text-base sm:text-lg">
                      Over 500 animals adopted this year! 🎉
                    </p>
                  </div>
                </div>

                {/* Success Stories Grid - NOW WITH REAL IMAGES */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {successStories.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-md group">
                      <img 
                        src={image} 
                        alt={`Success story ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs sm:text-sm">
                          Happy Home ❤️
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">Success Stories</h4>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>500+ animals found loving homes this year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>98% adoption success rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Lifetime support for all adopters</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Process Steps - Mobile/Tablet View */}
              <div className="lg:hidden bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                  Adoption Process
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-md">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form (KEPT AS IS) */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
                
                {/* Success Message */}
                {adoptionSubmitSuccess && (
                  <div className="m-4 sm:m-6 p-4 sm:p-5 bg-green-50 border-l-4 border-green-500 rounded-xl animate-in">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-green-800">Success!</h3>
                        <p className="text-xs sm:text-sm text-green-700 mt-1">
                          Your adoption request has been submitted successfully. We'll be in touch soon!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
                    Adoption Application
                  </h2>
                  <p className="text-sm sm:text-base text-white/90 text-center">
                    Start your journey to finding your perfect companion
                  </p>
                </div>

                <form onSubmit={adoptionHandle} className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">

                  {/* Personal Information Section */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={adoptionForm.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            adoptionErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {adoptionErrors.name && (
                          <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            {adoptionErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={adoptionForm.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            adoptionErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                        {adoptionErrors.phone && (
                          <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            {adoptionErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={adoptionForm.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          adoptionErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="john.doe@example.com"
                      />
                      {adoptionErrors.email && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {adoptionErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">
                        Full Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={adoptionForm.address}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none ${
                          adoptionErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Street address, City, State, ZIP Code"
                      />
                      {adoptionErrors.address && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {adoptionErrors.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Adoption Details Section */}
                  <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                        <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Adoption Details
                      </h3>
                    </div>

                    {/* Animal Type */}
                    <div>
                      <label htmlFor="animalType" className="block text-sm font-bold text-gray-700 mb-2">
                        Animal Type / Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="animalType"
                        name="animalType"
                        value={adoptionForm.animalType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          adoptionErrors.animalType ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="e.g., Golden Retriever, Max, or Cat"
                      />
                      {adoptionErrors.animalType && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {adoptionErrors.animalType}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-gray-500 mt-2 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        Please specify the type of animal you're interested in adopting or the name if you've already chosen one.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 sm:pt-6 border-t-2 border-gray-100">
                    <button
                      type="submit"
                      disabled={isLoadingAdoption}
                      className="w-full px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {isLoadingAdoption ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Adoption Application</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
                      By submitting this form, you agree to our adoption policies and consent to be contacted by our team.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps - Desktop View */}
      <section className="hidden lg:block py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Happens Next?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey to pet parenthood in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center group hover:scale-105"
              >
                <div className="inline-flex w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full items-center justify-center text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gray-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
            Ready to Change a Life?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/90 max-w-2xl mx-auto mb-6 sm:mb-8">
            Every animal deserves a loving home. Start your adoption journey today and make a lifelong friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 bg-white hover:bg-gray-100 text-green-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-sm sm:text-base"
            >
              Apply Now
            </button>
            <Link
              to="/contact"
              className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 shadow-xl text-center text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Adoption;