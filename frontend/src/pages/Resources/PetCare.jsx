import React, { useState } from 'react';
import { Heart, Utensils, Stethoscope, Scissors, Home, AlertCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
const PetCareGuide = () => {
  const [selectedPet, setSelectedPet] = useState('dogs');
  const [expandedSection, setExpandedSection] = useState(null);

  const careGuides = {
    dogs: [
      {
        id: 1,
        icon: Utensils,
        title: 'Nutrition & Feeding',
        color: 'orange',
        content: 'Feed your dog high-quality food appropriate for their age, size, and activity level. Adult dogs typically need 2 meals per day. Provide fresh water at all times. Avoid giving chocolate, grapes, onions, and other toxic foods.'
      },
      {
        id: 2,
        icon: Stethoscope,
        title: 'Healthcare',
        color: 'blue',
        content: 'Schedule annual vet checkups and keep vaccinations up to date. Prevent parasites with regular flea, tick, and heartworm treatments. Brush teeth regularly and watch for signs of illness like lethargy or loss of appetite.'
      },
      {
        id: 3,
        icon: Heart,
        title: 'Exercise & Play',
        color: 'pink',
        content: 'Most dogs need at least 30-60 minutes of exercise daily. Regular walks, playtime, and mental stimulation prevent behavioral issues. Adjust activity levels based on breed, age, and health status.'
      },
      {
        id: 4,
        icon: Scissors,
        title: 'Grooming',
        color: 'purple',
        content: 'Brush your dog regularly to prevent matting and reduce shedding. Bathe as needed, typically every 1-3 months. Trim nails monthly, clean ears weekly, and maintain dental hygiene.'
      },
      {
        id: 5,
        icon: Home,
        title: 'Training & Socialization',
        color: 'green',
        content: 'Start training early with positive reinforcement. Teach basic commands like sit, stay, and come. Socialize your dog with other animals and people to build confidence and prevent aggression.'
      },
      {
        id: 6,
        icon: AlertCircle,
        title: 'Safety Tips',
        color: 'red',
        content: 'Keep toxic substances out of reach. Ensure your yard is securely fenced. Use proper restraints in vehicles. Microchip your dog and keep ID tags current. Never leave dogs in hot cars.'
      }
    ],
    cats: [
      {
        id: 1,
        icon: Utensils,
        title: 'Nutrition & Feeding',
        color: 'orange',
        content: 'Cats are obligate carnivores requiring high-protein diets. Feed age-appropriate food 2-3 times daily. Always provide fresh water. Avoid milk, onions, garlic, and other harmful foods. Monitor weight to prevent obesity.'
      },
      {
        id: 2,
        icon: Stethoscope,
        title: 'Healthcare',
        color: 'blue',
        content: 'Annual vet visits are essential. Keep vaccinations current and schedule regular dental checkups. Spay or neuter your cat. Watch for signs of illness like changes in litter box habits or appetite.'
      },
      {
        id: 3,
        icon: Heart,
        title: 'Play & Enrichment',
        color: 'pink',
        content: 'Indoor cats need daily play sessions with interactive toys. Provide scratching posts, climbing trees, and window perches. Rotate toys to maintain interest. Mental stimulation prevents boredom and behavioral issues.'
      },
      {
        id: 4,
        icon: Scissors,
        title: 'Grooming',
        color: 'purple',
        content: 'Brush regularly, especially long-haired cats. Trim nails every 2-3 weeks. Clean ears gently when needed. Most cats groom themselves but may need occasional baths. Monitor for hairballs.'
      },
      {
        id: 5,
        icon: Home,
        title: 'Litter Box Care',
        color: 'green',
        content: 'Provide one litter box per cat plus one extra. Scoop daily and change litter weekly. Place boxes in quiet, accessible locations. Some cats prefer covered boxes while others like open ones.'
      },
      {
        id: 6,
        icon: AlertCircle,
        title: 'Safety Tips',
        color: 'red',
        content: 'Keep toxic plants, chemicals, and small objects out of reach. Secure windows and balconies. Microchip your cat and use breakaway collars. Consider keeping cats indoors to protect from traffic and predators.'
      }
    ]
  };

  const emergencySigns = [
    'Difficulty breathing or rapid breathing',
    'Excessive vomiting or diarrhea',
    'Seizures or collapse',
    'Bleeding that won\'t stop',
    'Unable to urinate or defecate',
    'Eye injuries or sudden blindness',
    'Ingestion of toxic substances',
    'Severe pain or distress'
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-black py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Pet Care Guide</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Everything you need to know to keep your furry friends happy, healthy, and thriving.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pet Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-md inline-flex">
            <button
              onClick={() => setSelectedPet('dogs')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedPet === 'dogs'
                  ? 'bg-gradient-to-r from-zinc-800 to-slate-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-100'
              }`}
            >
              🐕 Dogs
            </button>
            <button
              onClick={() => setSelectedPet('cats')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedPet === 'cats'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🐈 Cats
            </button>
          </div>
        </div>

        {/* Care Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {careGuides[selectedPet].map(guide => {
            const Icon = guide.icon;
            const isExpanded = expandedSection === guide.id;
            
            return (
              <div
                key={guide.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`bg-gradient-to-br from-${guide.color}-100 to-${guide.color}-50 p-6 text-black cursor-pointer`}
                  onClick={() => toggleSection(guide.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-10 h-10" />
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold">{guide.title}</h3>
                </div>
                
                {isExpanded && (
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{guide.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Emergency Section */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Warning Signs</h2>
              <p className="text-red-800 mb-4">
                Seek immediate veterinary care if your pet shows any of these symptoms:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencySigns.map((sign, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span className="text-red-800">{sign}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-900 font-semibold">
                  📞 Emergency Vet Hotline: <a href="tel:+911234567890" className="underline hover:text-red-700">+91 (123) 456-7890</a>
                </p>
                <p className="text-red-800 text-sm mt-1">Available 24/7 for urgent pet health concerns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Kindly contact pet care experts for personalized guidance.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PetCareGuide;