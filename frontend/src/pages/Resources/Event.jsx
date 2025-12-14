
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Tag, ArrowRight } from 'lucide-react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'

const Events = () => {
  const [selectedType, setSelectedType] = useState('all');

  const eventTypes = ['all', 'adoption', 'fundraiser', 'education', 'volunteer'];

  const events = [
    {
      id: 1,
      title: 'Holiday Adoption Drive',
      type: 'adoption',
      date: '2024-12-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Central Park, Main Plaza',
      description: 'Find your perfect companion this holiday season! Meet dozens of adorable dogs and cats looking for loving homes. Reduced adoption fees, free pet supplies, and professional photos with Santa!',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
      spots: '50+ pets available',
      featured: true
    },
    {
      id: 2,
      title: 'Puppy Training Workshop',
      type: 'education',
      date: '2024-12-18',
      time: '6:00 PM - 8:00 PM',
      location: 'WellCare Training Center',
      description: 'Learn essential puppy training techniques from certified trainers. Topics include housebreaking, basic commands, socialization, and addressing common behavioral issues. Perfect for new puppy parents!',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
      spots: '15 spots remaining',
      featured: false
    },
    {
      id: 3,
      title: 'Paws & Claws Charity Gala',
      type: 'fundraiser',
      date: '2024-12-20',
      time: '7:00 PM - 11:00 PM',
      location: 'Grand Ballroom, Downtown Hotel',
      description: 'Join us for an elegant evening supporting animal rescue. Enjoy dinner, live music, silent auction, and inspiring stories. Formal attire. Tickets: $150 per person, proceeds benefit rescue operations.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      spots: '75 tickets available',
      featured: true
    },
    {
      id: 4,
      title: 'Volunteer Orientation',
      type: 'volunteer',
      date: '2024-12-22',
      time: '2:00 PM - 4:00 PM',
      location: 'WellCare Shelter',
      description: 'Interested in volunteering? Attend our orientation to learn about opportunities, meet our team, tour the facility, and start making a difference in animals\' lives. No experience necessary!',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      spots: 'Registration required',
      featured: false
    },
    {
      id: 5,
      title: 'New Year Adoption Fair',
      type: 'adoption',
      date: '2025-01-05',
      time: '11:00 AM - 5:00 PM',
      location: 'Community Center',
      description: 'Start the new year with a new best friend! Special adoption pricing, meet-and-greets with available pets, pet care demonstrations, and family-friendly activities. Bring the whole family!',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      spots: 'Walk-ins welcome',
      featured: false
    },
    {
      id: 6,
      title: 'Pet First Aid & CPR Class',
      type: 'education',
      date: '2025-01-10',
      time: '10:00 AM - 2:00 PM',
      location: 'WellCare Education Center',
      description: 'Learn life-saving skills for pets! Hands-on training in pet CPR, choking response, wound care, and emergency preparedness. Certified instruction, course materials included. $50 registration fee.',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
      spots: '12 spots remaining',
      featured: false
    },
    {
      id: 7,
      title: 'Annual Bark in the Park',
      type: 'fundraiser',
      date: '2025-01-20',
      time: '9:00 AM - 2:00 PM',
      location: 'Riverside Park',
      description: 'Our biggest fundraising event of the year! Dog walk, agility demonstrations, vendor booths, food trucks, live entertainment, and fun for the whole family. $25 registration, includes event t-shirt.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      spots: '200+ registered',
      featured: true
    },
    {
      id: 8,
      title: 'Cat Behavior Seminar',
      type: 'education',
      date: '2025-01-25',
      time: '5:30 PM - 7:30 PM',
      location: 'Online via Zoom',
      description: 'Understanding your cat\'s mysterious ways! Expert-led discussion on feline behavior, body language, enrichment activities, and solving common problems. Q&A session included. Free for adopters!',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      spots: 'Unlimited (virtual)',
      featured: false
    }
  ];

  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  const getEventTypeColor = (type) => {
    const colors = {
      adoption: 'from-blue-500 to-cyan-500',
      fundraiser: 'from-purple-500 to-pink-500',
      education: 'from-green-500 to-teal-500',
      volunteer: 'from-orange-500 to-red-500'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-black py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Upcoming Events</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Join us for adoption fairs, fundraisers, educational workshops, and volunteer opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedType === type
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Featured Events */}
        {selectedType === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.filter(e => e.featured).map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2 text-purple-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{event.spots}</span>
                      </div>
                      <button className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all">
                        <span>Register</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedType === 'all' ? 'All Events' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Events`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-3 left-3 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {event.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.spots}</span>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
          <p className="text-lg mb-6 text-orange-100 max-w-2xl mx-auto">
            Subscribe to our calendar and get notifications about upcoming events, adoption fairs, and volunteer opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Subscribe to Calendar
            </button>
            <button className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors border-2 border-white">
              View Full Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Events;