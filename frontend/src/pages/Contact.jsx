import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle, Heart, PawPrint, Calendar, Users, MessageCircle } from 'lucide-react';
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
export default function Contact() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      primary: "(555) 123-4567",
      secondary: "Mon-Fri: 9AM-6PM",
      emergency: "Emergency: (555) 987-6543",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "rescuewellcareanimal@gmail.com",
      secondary: "rescuewellcareanimal@gmail.com",
      emergency: "We respond within 24 hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "123 Rescue Avenue",
      secondary: "Pune",
      emergency: "By appointment only",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const departments = [
    {
      icon: Heart,
      title: "Adoptions",
      description: "Find your perfect companion and learn about our adoption process",
      contact: "rescuewellcareanimal@gmail.com",
      phone: "(555) 123-4501"
    },
    {
      icon: Users,
      title: "Volunteer",
      description: "Join our team and make a difference in animals' lives",
      contact: "rescuewellcareanimal@gmail.com",
      phone: "(555) 123-4502"
    },
    {
      icon: Heart,
      title: "Donations",
      description: "Support our mission through monetary or supply donations",
      contact: "rescuewellcareanimal@gmail.com",
      phone: "(555) 123-4503"
    },
    {
      icon: MessageCircle,
      title: "Surrender Services",
      description: "We help rehome animals with compassion and care",
      contact: "intake@wellcarerescue.org",
      phone: "(555) 123-4504"
    }
  ];

  const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "12:00 PM - 4:00 PM" },
    { day: "Holidays", time: "Closed" }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help animals in need and answer your questions. Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-2xl p-8 mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center space-x-4 text-white">
            <AlertCircle className="w-12 h-12 animate-pulse" />
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Animal Emergency?</h3>
              <p className="text-lg">Call our 24/7 emergency hotline immediately</p>
              <a href="tel:+91559876543" className="text-3xl font-bold mt-2 inline-block hover:underline">
                (555) 987-6543
              </a>
            </div>
          </div>
        </div>

        {/* Main Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`bg-gradient-to-br ${method.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transform transition-transform duration-300 ${hoveredCard === idx ? 'scale-110 rotate-12' : ''}`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                {method.title}
              </h3>
              <div className="space-y-2 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {method.primary}
                </p>
                <p className="text-gray-600">
                  {method.secondary}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {method.emergency}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Departments
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-indigo-500"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-lg">
                    <dept.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {dept.title}
                    </h4>
                    <p className="text-gray-600 mb-3">
                      {dept.description}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="text-indigo-600 font-semibold">
                        📧 {dept.contact}
                      </p>
                      <p className="text-gray-700">
                        📞 {dept.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hours and Location Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Operating Hours */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-8 h-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Operating Hours
              </h3>
            </div>
            <div className="space-y-4">
              {hours.map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                >
                  <span className="font-semibold text-gray-800">
                    {schedule.day}
                  </span>
                  <span className="text-gray-600">
                    {schedule.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All visits require an appointment. Please call ahead to schedule.
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-8 h-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Find Us
              </h3>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-indigo-300">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <p className="text-indigo-800 font-semibold text-lg">
                  123 Rescue Avenue
                </p>
                <p className="text-indigo-600">
                123 Hinjewadi, pune
                </p>
                <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Additional Info */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Stay Connected
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Follow us on social media for updates on animals available for adoption, success stories, and ways to help!
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Facebook
            </button>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Instagram
            </button>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Twitter
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Well Care Animal Rescue. All rights reserved. | 501(c)(3) Non-Profit Organization
          </p>
        </div>
      </footer>
    </div>
    <Footer/>
    </>
  );
}