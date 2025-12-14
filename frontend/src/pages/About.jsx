import React, { useState } from 'react';
import { Heart, Users, Award, TrendingUp, Shield, Sparkles, Target, Eye, Globe, CheckCircle, PawPrint, Star } from 'lucide-react';
import {Link} from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: "2,500+", label: "Animals Rescued", icon: PawPrint },
    { number: "1,800+", label: "Successful Adoptions", icon: Heart },
    { number: "350+", label: "Active Volunteers", icon: Users },
    { number: "15+", label: "Years of Service", icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "Every animal deserves love, care, and a second chance at life. We treat each rescue with dignity and compassion."
    },
    {
      icon: Shield,
      title: "Safety & Wellness",
      description: "We prioritize the health and safety of every animal in our care through comprehensive veterinary support."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Building stronger communities through education, outreach, and responsible pet ownership programs."
    },
    {
      icon: Sparkles,
      title: "Transparency",
      description: "Operating with complete openness about our processes, finances, and outcomes to maintain public trust."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Executive Director",
      image: "👩‍⚕️",
      bio: "Veterinarian with 20+ years of experience in animal welfare and rescue operations."
    },
    {
      name: "James Rodriguez",
      role: "Operations Manager",
      image: "👨‍💼",
      bio: "Former shelter director dedicated to creating efficient, compassionate rescue systems."
    },
    {
      name: "Emily Chen",
      role: "Adoption Coordinator",
      image: "👩‍💻",
      bio: "Animal behaviorist specializing in matching pets with their perfect families."
    },
    {
      name: "Marcus Thompson",
      role: "Volunteer Director",
      image: "👨‍🏫",
      bio: "Community organizer building our volunteer network and training programs."
    }
  ];

  const milestones = [
    { event: "Well Care Animal Rescue founded with a mission to save homeless animals" },
    { event: "Opened our first shelter facility, expanding capacity to 50 animals" },
    { event: "Reached 1,000 successful adoptions milestone" },
    { event: "Launched community education and spay/neuter programs" },
    { event: "Expanded facility to accommodate 100+ animals" },
    { event: "Celebrated 2,500+ animals rescued and rehomed" }
  ];

  const programs = [
    {
      title: "Rescue & Rehabilitation",
      description: "We rescue animals from shelters, streets, and difficult situations, providing medical care, rehabilitation, and behavioral support.",
      icon: Heart
    },
    {
      title: "Adoption Services",
      description: "Comprehensive matching process ensuring perfect placements, with lifetime support for adopted families.",
      icon: Users
    },
    {
      title: "Community Education",
      description: "Teaching responsible pet ownership, animal welfare, and advocacy through workshops and school programs.",
      icon: Globe
    },
    {
      title: "Spay/Neuter Initiative",
      description: "Affordable spay and neuter services to reduce pet overpopulation in our community.",
      icon: Shield
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            About Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, Well Care Animal Rescue has been dedicated to rescuing, rehabilitating, and rehoming animals in need. We believe every animal deserves a loving home and a second chance at happiness.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values Tabs */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'mission'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Target className="w-5 h-5 inline-block mr-2" />
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'vision'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-5 h-5 inline-block mr-2" />
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'values'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className="w-5 h-5 inline-block mr-2" />
              Our Values
            </button>
          </div>

          <div className="min-h-48">
            {activeTab === 'mission' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To rescue, rehabilitate, and rehome animals in need while promoting responsible pet ownership and advocating for animal welfare in our community. We are committed to providing compassionate care, medical treatment, and behavioral support to every animal that comes through our doors, ensuring they find their forever homes where they will be loved and cherished.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A world where every animal has a safe, loving home and where communities embrace their responsibility to protect and care for animals. We envision a future free from animal homelessness and suffering, where education and compassion drive positive change, and where the human-animal bond is celebrated and nurtured across all communities.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                {values.map((value, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <div className="bg-white p-3 rounded-lg shadow-md">
                      <value.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Programs
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-500"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-xl">
                    <program.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {program.title}
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h3>
          <div className="space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold w-12 h-12 rounded-full shadow-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-indigo-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h3 className="text-4xl font-bold mb-4">
            Join Our Mission
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether through adoption, volunteering, or donations, you can make a real difference in the lives of animals in need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to='/adopt' className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Adopt a Pet
            </Link>
            <Link to='/volunteer' className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
              Become a Volunteer
            </Link>
            <Link to='/donate' className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Donate Now
            </Link>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
}