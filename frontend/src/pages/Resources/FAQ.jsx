import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'adoption', 'volunteering', 'donations', 'pet care', 'rescue'];

  const faqs = [
    {
      id: 1,
      category: 'adoption',
      question: 'What is the adoption process?',
      answer: 'Our adoption process includes: 1) Browse available pets online or visit our shelter, 2) Complete an adoption application, 3) Meet with our adoption counselor for an interview, 4) Meet and interact with the pet, 5) Home visit (if required), 6) Finalize adoption paperwork and pay adoption fee, 7) Take your new family member home! The entire process typically takes 3-7 days.'
    },
    {
      id: 2,
      category: 'adoption',
      question: 'How much does it cost to adopt a pet?',
      answer: 'Adoption fees vary by animal: Dogs (adult) $150-250, Dogs (puppies) $250-350, Cats (adult) $100-150, Cats (kittens) $125-200. Fees include spay/neuter, vaccinations, microchip, and initial health check. Special promotions may offer reduced fees for senior pets or during adoption events.'
    },
    {
      id: 3,
      category: 'adoption',
      question: 'Can I adopt if I live in an apartment?',
      answer: 'Yes! Many of our pets are well-suited for apartment living. We consider factors like the pet\'s size, energy level, and exercise needs. Some landlords have restrictions, so please verify your lease allows pets and any breed/size limitations before applying.'
    },
    {
      id: 4,
      category: 'adoption',
      question: 'What if my current pets don\'t get along with the new pet?',
      answer: 'We offer a 14-day trial period for most adoptions. If there are serious compatibility issues that can\'t be resolved, you can return the pet within this period for a full refund. We also provide free behavioral consultations to help with the introduction process.'
    },
    {
      id: 5,
      category: 'volunteering',
      question: 'How can I become a volunteer?',
      answer: 'To volunteer, complete our online application form, attend a mandatory orientation session (held monthly), complete any required training for your chosen role, and then start volunteering! We ask for a minimum commitment of 4 hours per month for at least 6 months.'
    },
    {
      id: 6,
      category: 'volunteering',
      question: 'What volunteer opportunities are available?',
      answer: 'We offer various roles including: Animal care (feeding, cleaning, socializing), Dog walking, Cat socialization, Foster care, Event assistance, Administrative support, Photography, Social media management, and Fundraising. Opportunities are available for all skill levels!'
    },
    {
      id: 7,
      category: 'volunteering',
      question: 'Do I need experience with animals to volunteer?',
      answer: 'No prior experience is required! We provide comprehensive training for all volunteers. Your passion for helping animals is what matters most. Some specialized roles may require specific skills, but we have opportunities suitable for everyone.'
    },
    {
      id: 8,
      category: 'donations',
      question: 'Are donations tax-deductible?',
      answer: 'Yes! WellCare Animal Rescue is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a receipt for your records after making a donation.'
    },
    {
      id: 9,
      category: 'donations',
      question: 'What items can I donate?',
      answer: 'We gratefully accept: Pet food (unopened bags), Blankets and towels, Toys and treats, Collars and leashes, Cleaning supplies, Cat litter, Crates and carriers, Pet beds. Please ensure all items are new or gently used. We cannot accept expired food or medications.'
    },
    {
      id: 10,
      category: 'donations',
      question: 'Can I donate in memory of a pet?',
      answer: 'Absolutely! Memorial donations are a beautiful way to honor a beloved pet. We can send an acknowledgment card to the family if you provide their contact information. Your donation will help other animals in need find loving homes.'
    },
    {
      id: 11,
      category: 'pet care',
      question: 'What vaccinations do adopted pets receive?',
      answer: 'All adopted pets receive age-appropriate core vaccinations. Dogs receive: DHPP (distemper, hepatitis, parvovirus, parainfluenza), Rabies, and Bordetella. Cats receive: FVRCP (feline viral rhinotracheitis, calicivirus, panleukopenia) and Rabies. Additional vaccines may be given based on the pet\'s health history.'
    },
    {
      id: 12,
      category: 'pet care',
      question: 'Do you provide post-adoption support?',
      answer: 'Yes! We offer lifetime support including: Free behavioral consultations, Discounted veterinary care through partner clinics, Training resources and guides, 24/7 emergency advice hotline, and Access to our online community forum. We\'re here for you and your pet!'
    },
    {
      id: 13,
      category: 'rescue',
      question: 'I found a stray animal. What should I do?',
      answer: 'First, ensure your safety and the animal\'s safety. If friendly, check for ID tags and contact the owner. If no ID, contact us at (123) 456-7890 or your local animal control. If possible, provide temporary shelter and don\'t let the animal roam. We can guide you through next steps.'
    },
    {
      id: 14,
      category: 'rescue',
      question: 'Do you rescue animals from other states?',
      answer: 'Our primary focus is local rescues within our service area. However, we partner with rescue organizations nationwide for special cases. If you know of an animal in need outside our area, contact us and we\'ll try to connect you with appropriate resources.'
    },
    {
      id: 15,
      category: 'rescue',
      question: 'How do you determine which animals to rescue?',
      answer: 'We assess each case based on: Urgency of the situation, Animal\'s medical needs, Available space and resources, Likelihood of successful rehabilitation, and Overall ability to provide proper care. We prioritize animals in immediate danger and those with the best chance of finding homes.'
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-black py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Find answers to common questions about adoption, volunteering, donations, and more.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map(faq => {
            const isOpen = openFAQ === faq.id;
            
            return (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No questions found matching your search.</p>
            <p className="text-gray-400">Try different keywords or browse all categories.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-lg mb-6 text-orange-100">
            Our team is here to help! Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:rescuewellcareanimal@gmail.com"
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+911234567890"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors border-2 border-white"
            >
              Call 123 456-7890
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;