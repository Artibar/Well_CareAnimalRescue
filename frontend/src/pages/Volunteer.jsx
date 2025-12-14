import React from 'react';
import { User, Home, BookOpen, Phone, Mail, Heart, Clock, Users, Camera, Car, PawPrint, TrendingUp, Award, Smile } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useVolunteerStore from '../store/useVolunteerStore.js';
import RescueO from '../assets/RescueO.jpeg';
import Navbar from '../component/Navbar.jsx';
import Footer from '../component/Footer.jsx'

const Volunteer = () => {
  const navigate = useNavigate();

  const {
    volunteerForm,
    volunteerErrors,
    isLoadingVolunteer,
    updateVolunteerField,
    submitVolunteerForm,
  } = useVolunteerStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateVolunteerField(name, value);
  };

  const volunteerHandle = async (e) => {
    e.preventDefault();
    const result = await submitVolunteerForm();

    if (result.success) {
      navigate('/volunteerPage');
    }
  };

  const opportunities = [
    {
      icon: PawPrint,
      title: "Dog Walking",
      description: "Help our dogs get exercise and socialization with regular walks and playtime",
      time: "2-4 hours/week",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Cat Socialization",
      description: "Spend time with our feline friends, helping them become more comfortable",
      time: "2-3 hours/week",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Event Support",
      description: "Help at adoption events, fundraisers, and community outreach programs",
      time: "Flexible",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Take beautiful photos of our animals to help them find homes faster",
      time: "2-4 hours/week",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Car,
      title: "Animal Transport",
      description: "Drive animals to vet appointments, foster homes, or adoption events",
      time: "As needed",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Home,
      title: "Foster Care",
      description: "Provide temporary loving homes for animals awaiting adoption",
      time: "Varies",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    "Make a real difference in animals' lives",
    "Gain experience for veterinary or animal care careers",
    "Meet like-minded animal lovers",
    "Flexible scheduling to fit your life",
    "Training and support provided",
    "Volunteer appreciation events"
  ];

  const stats = [
    { icon: Users, number: "100+", label: "Active Volunteers", color: "text-blue-600" },
    { icon: Clock, number: "10k+", label: "Hours Donated", color: "text-green-600" },
    { icon: Smile, number: "97%", label: "Satisfaction Rate", color: "text-purple-600" }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${RescueO})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl animate-fade-in">
              Make a Difference Today
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-6 sm:mb-8 font-medium drop-shadow-lg px-4">
              Join our team of dedicated volunteers and help give homeless animals a second chance at happiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
              <Link
                to='/volunteer'
                className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 shadow-xl text-center"
              >
                Apply Now
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

      {/* Volunteer Opportunities Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Volunteer Opportunities
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect way to contribute based on your skills and interests
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105"
                >
                  <div className={`h-2 bg-gradient-to-r ${opportunity.color}`}></div>
                  <div className="p-6 sm:p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${opportunity.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {opportunity.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{opportunity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
                Why Volunteer With Us
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color}`} />
                      </div>
                    </div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 font-semibold">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Volunteer Application
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Join our team of dedicated volunteers making a difference in animals' lives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <form onSubmit={volunteerHandle} className="p-6 sm:p-8 lg:p-10">
              
              {/* Personal Information Header */}
              <div className="pb-6 border-b-2 border-gray-100 mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600 text-sm sm:text-base">Please fill in your contact details</p>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={volunteerForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                      volunteerErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your name"
                  />
                  {volunteerErrors.name && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                      {volunteerErrors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-green-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={volunteerForm.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                      volunteerErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="+91 Enter your phone"
                  />
                  {volunteerErrors.phone && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                      {volunteerErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-6 sm:mb-8">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-green-600" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={volunteerForm.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                    volunteerErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {volunteerErrors.email && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {volunteerErrors.email}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="mb-6 sm:mb-8">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <Home className="w-4 h-4 mr-2 text-green-600" />
                  Full Address *
                </label>
                <textarea
                  name="address"
                  value={volunteerForm.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 resize-none text-sm sm:text-base ${
                    volunteerErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter your complete address with landmark"
                />
                {volunteerErrors.address && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {volunteerErrors.address}
                  </p>
                )}
              </div>

              {/* About You Header */}
              <div className="pb-6 border-b-2 border-gray-100 mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">About You</h3>
                <p className="text-gray-600 text-sm sm:text-base">Tell us about your skills and motivation</p>
              </div>

              {/* Skills */}
              <div className="mb-6 sm:mb-8">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                  Skills & Experience *
                </label>
                <input
                  type="text"
                  name="skills"
                  value={volunteerForm.skills}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm sm:text-base ${
                    volunteerErrors.skills ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="e.g., Animal handling, Photography, Event planning"
                />
                {volunteerErrors.skills && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {volunteerErrors.skills}
                  </p>
                )}
              </div>

              {/* Join Reason */}
              <div className="mb-8 sm:mb-10">
                <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                  <Heart className="w-4 h-4 mr-2 text-green-600" />
                  Why do you want to join us? *
                </label>
                <textarea
                  name="joinReason"
                  value={volunteerForm.joinReason}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 resize-none text-sm sm:text-base ${
                    volunteerErrors.joinReason ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Tell us what motivates you to volunteer and how you'd like to contribute..."
                />
                {volunteerErrors.joinReason && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {volunteerErrors.joinReason}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoadingVolunteer}
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoadingVolunteer ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    <span>Submit Volunteer Application</span>
                  </>
                )}
              </button>

              {/* Info Text */}
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                By submitting this form, you agree to our volunteer terms and conditions. We'll contact you within 2-3 business days.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gray-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/90 max-w-2xl mx-auto mb-6 sm:mb-8">
            Your time and compassion can change an animal's life. Join us today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto px-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 bg-white hover:bg-gray-100 text-green-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Apply Now
            </button>
            <Link
              to="/contact"
              className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 transition-all duration-300 hover:scale-105 shadow-xl text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Volunteer;