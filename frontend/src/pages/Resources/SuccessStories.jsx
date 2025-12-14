import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Share2 } from 'lucide-react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import {Link } from 'react-router-dom'

const SuccessStories = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stories = [
    {
      id: 1,
      petName: 'Bella',
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      adoptionDate: 'November 2024',
      location: 'Ahemd nagar, Maharashtra',
      story: 'Bella was found abandoned in a parking lot during a harsh winter storm. She was malnourished, scared, and had lost trust in humans. After months of patient care and rehabilitation at our shelter, Bella slowly began to open up. The Martinez family fell in love with her gentle spirit and adopted her. Today, Bella is thriving - she loves playing in their backyard, going on hiking trips, and cuddling on the couch. She\'s even become a certified therapy dog, bringing joy to nursing home residents!',
      quote: 'Bella has brought so much love into our lives. We can\'t imagine our family without her!',
      owner: 'The Martinez Family'
    },
    {
      id: 2,
      petName: 'Oliver',
      type: 'cat',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      adoptionDate: 'October 2024',
      location: 'Pune',
      story: 'Oliver was rescued from a hoarding situation with 40 other cats. He was extremely shy and wouldn\'t let anyone touch him. Our volunteers spent hours just sitting near him, letting him adjust at his own pace. After 3 months, Oliver started seeking attention. Emily, a teacher, visited weekly and built a special bond with him. Now Oliver is the king of her apartment - he greets her at the door, sleeps on her pillow, and even plays fetch with toy mice!',
      quote: 'Oliver has taught me so much about patience and unconditional love. He\'s my best friend.',
      owner: 'Emily Richardson'
    },
    {
      id: 3,
      petName: 'Max & Ruby',
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
      adoptionDate: 'September 2024',
      location: 'Pune',
      story: 'Max and Ruby, a bonded pair of senior dogs, were surrendered when their elderly owner passed away. We were determined to keep them together - they\'d been companions for 10 years. The Wilson family, who had recently lost their own dog, visited our shelter and immediately connected with this sweet duo. Now Max and Ruby spend their golden years on a ranch, chasing butterflies and napping in the sun together. They\'ve given the Wilson family a renewed sense of purpose and joy.',
      quote: 'Adopting Max and Ruby was the best decision we ever made. They completed our family.',
      owner: 'The Wilson Family'
    },
    {
      id: 4,
      petName: 'Luna',
      type: 'cat',
      image: 'https://i.redd.it/qxm3bb6pc0u71.jpg',
      adoptionDate: 'August 2024',
      location: 'Nashik',
      story: 'Luna was found as a tiny kitten, barely 4 weeks old, alone and crying in an alley. She required round-the-clock bottle feeding and intensive care. Our foster volunteers worked tirelessly to nurse her back to health. Despite her rough start, Luna grew into a playful, affectionate cat. Sarah, a graphic designer, adopted Luna and they\'ve been inseparable ever since. Luna loves to "help" Sarah work by sitting on her keyboard and has her own Instagram with thousands of followers!',
      quote: 'Luna survived against all odds. She\'s my little miracle and inspires me every day.',
      owner: 'Sarah Chen',
      
    },
    {
      id: 5,
      petName: 'Duke',
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      adoptionDate: 'July 2024',
      location: 'Mumbai',
      story: 'Duke, a former bait dog rescued from a fighting ring, had severe physical and emotional scars. Many people passed him by at the shelter, intimidated by his past. But Jake, a veteran with PTSD, saw past Duke\'s trauma. They began healing together through patience, training, and mutual understanding. Duke is now Jake\'s service dog, helping him manage anxiety and depression. Their bond is unbreakable, and Duke has transformed from a fearful dog into a confident, loving companion who saves lives.',
      quote: 'Duke saved me just as much as I saved him. We healed each other.',
      owner: 'Jake Thompson'
    },
    {
      id: 6,
      petName: 'Whiskers & Mittens',
      type: 'cat',
      image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&q=80',
      adoptionDate: 'June 2024',
      location: 'Pune, maharashtra',
      story: 'Whiskers and Mittens, two senior cats who had lived together for 12 years, were surrendered when their owner moved into assisted living. Finding homes for senior cats is challenging, let alone a bonded pair. The Johnsons, empty nesters, decided to give them a chance. These cats have brought unexpected joy, laughter, and companionship into their quiet home. Whiskers loves bird watching, while Mittens enjoys lounging in sunbeams. The Johnsons say adopting senior pets was the most rewarding decision they\'ve ever made.',
      quote: 'These sweet souls deserved a loving home for their golden years. They\'ve enriched our retirement immensely.',
      owner: 'The Johnson Family'
    }
  ];

  const filteredStories = selectedFilter === 'all' 
    ? stories 
    : stories.filter(story => story.type === selectedFilter);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-black  shadow-2xl py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Success Stories</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Heartwarming tales of rescue, recovery, and the beautiful bond between pets and their forever families.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            All Stories
          </button>
          <button
            onClick={() => setSelectedFilter('dog')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedFilter === 'dog'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            🐕 Dogs
          </button>
          <button
            onClick={() => setSelectedFilter('cat')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedFilter === 'cat'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            🐈 Cats
          </button>
        </div>

        {/* Stories Grid */}
        <div className="space-y-12">
          {filteredStories.map((story, index) => (
            <div
              key={story.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.petName}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  {story.type === 'dog' ? '🐕' : '🐈'} {story.petName}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-10">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{story.adoptionDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{story.location}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {story.petName}'s Journey
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {story.story}
                </p>

                {/* Quote Box */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-500 p-5 rounded-r-lg mb-6">
                  <p className="text-gray-800 italic mb-2">"{story.quote}"</p>
                  <p className="text-sm font-semibold text-pink-600">— {story.owner}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Love This Story</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of a Success Story</h2>
          <p className="text-lg mb-8 text-orange-100 max-w-2xl mx-auto">
            Every adoption creates a beautiful new chapter. Could you be the hero in an animal's story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/adopt' className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Adopt a Pet
            </Link>
            
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SuccessStories;