import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Heart, Shield, Stethoscope, Users, Award, ArrowRight, PawPrint, Bird, AlertTriangle, Info, Phone, Clock, MapPin, Star, Link } from 'lucide-react';
import Image1 from '../assets/Image1.jpeg'
import image2 from '../assets/image2.webp'
import image3 from '../assets/image3.webp'
import image4 from '../assets/image4.webp'
import image5 from '../assets/image5.webp'
import image6 from '../assets/image6.webp'
import image7 from '../assets/image7.webp'
import image8 from '../assets/image8.webp'
import image9 from '../assets/image9.webp'
import Rescue0 from '../assets/Rescue0.jpeg'
import Species from '../assets/Species.jpeg'
import medical from '../assets/medical.jpeg'
import Reha from '../assets/Reha.jpeg'
import AdopDog from '../assets/AdopDog.jpeg'
import onSupport from '../assets/onSupport.jpeg'

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Placeholder images - replace these URLs with your actual image URLs
  const HomeRescue = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80";
  const HealthyLives = "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80";
  const animalImages = [
    Image1, image2, image3, image4, image5, image6, image7, image8, image9
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Hero carousel
  const heroSlides = [
    {
      title: "Every Life Deserves a Second Chance",
      subtitle: "Rescuing, rehabilitating, and protecting animals of all kinds—from pets to wildlife",
      gradient: "from-emerald-600 via-green-500 to-teal-500"
    },
    {
      title: "Be the Change They Need",
      subtitle: "Join us in creating a world where every animal is valued and protected",
      gradient: "from-blue-600 via-indigo-500 to-purple-500"
    },
    {
      title: "Compassion in Action",
      subtitle: "Professional rescue and rehabilitation services available 24/7",
      gradient: "from-orange-600 via-amber-500 to-yellow-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const animalCategories = [
    {
      title: "Domestic Animals",
      animals: ["Dogs", "Cats", "Rabbits", "Guinea Pigs"],
      status: "Available for Adoption",
      statusColor: "text-emerald-700",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
      icon: PawPrint,
      iconBg: "bg-emerald-500"
    },
    {
      title: "Birds",
      animals: ["Parrots", "Pigeons", "Doves", "Canaries"],
      status: "Case-by-case Adoption",
      statusColor: "text-blue-700",
      bgGradient: "from-blue-50 to-sky-50",
      borderColor: "border-blue-200",
      icon: Bird,
      iconBg: "bg-blue-500"
    },
    {
      title: "Wildlife & Reptiles",
      animals: ["Snakes", "Turtles", "Crocodiles", "Wild Birds"],
      status: "Rescue & Release Only",
      statusColor: "text-red-700",
      bgGradient: "from-red-50 to-orange-50",
      borderColor: "border-red-200",
      icon: Shield,
      iconBg: "bg-red-500"
    }
  ];

  const rescueProcess = [
    {
      number: "01",
      title: "Emergency Response",
      image: Rescue0,
      description: "24/7 hotline for immediate animal rescue. Our team responds to calls about injured, abandoned, or distressed animals of all species.",
      icon: Shield,
      gradient: "from-red-500 to-rose-600",
      bgPattern: "bg-red-50"
    },
    {
      number: "02",
      title: "Species Assessment",
      image: Species,
      description: "Experts identify the species and assess appropriate care path and legal requirements for treatment.",
      icon: Info,
      gradient: "from-indigo-500 to-purple-600",
      bgPattern: "bg-indigo-50"
    },
    {
      number: "03",
      title: "Medical Treatment",
      image: medical,
      description: "Specialized veterinary care including treatment for injuries, diseases, vaccinations, and nutritional support.",
      icon: Stethoscope,
      gradient: "from-blue-500 to-cyan-600",
      bgPattern: "bg-blue-50"
    },
    {
      number: "04",
      title: "Rehabilitation",
      image:Reha,
      description: "Recovery in species-appropriate habitats with proper environmental enrichment and preparation for the next phase.",
      icon: Heart,
      gradient: "from-green-500 to-emerald-600",
      bgPattern: "bg-green-50"
    },
    {
      number: "05",
      title: "Adoption or Release",
      image: AdopDog,
      description: "Domestic animals matched with families. Wildlife released to natural habitat or transferred to sanctuaries.",
      icon: Users,
      gradient: "from-orange-500 to-amber-600",
      bgPattern: "bg-orange-50"
    },
    {
      number: "06",
      title: "Ongoing Support",
      image: onSupport,
      description: "Post-adoption care for pets and monitoring of released wildlife with lifetime guidance for adopters.",
      icon: Award,
      gradient: "from-purple-500 to-pink-600",
      bgPattern: "bg-purple-50"
    }
  ];

  const impactStats = [
    { number: "2,500+", label: "Animals Rescued", icon: PawPrint, gradient: "from-blue-500 to-cyan-500" },
    { number: "1,800+", label: "Successful Adoptions", icon: Heart, gradient: "from-pink-500 to-rose-500" },
    { number: "700+", label: "Wildlife Released", icon: Bird, gradient: "from-green-500 to-emerald-500" },
    { number: "24/7", label: "Emergency Response", icon: Shield, gradient: "from-orange-500 to-red-500" }
  ];

  const testimonials = [
    { name: "Sarah M.", text: "Adopting Max was the best decision. The team was incredibly supportive throughout!", rating: 5 },
    { name: "Raj P.", text: "They rescued an injured bird near my home. Professional and caring service.", rating: 5 },
    { name: "Lisa K.", text: "Wonderful organization doing amazing work for all kinds of animals.", rating: 5 }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <img 
            src={HomeRescue} 
            alt="Well Care Animal Rescue" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="text-white/90 text-sm font-medium">24/7 Emergency Hotline Available</span>
            </div>
          </div>

          {/* Carousel Slides */}
          <div className="relative overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === activeSlide ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-10 pointer-events-none'
                }`}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight">
                  <span className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                    {slide.title}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-12 font-light">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mb-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full overflow-hidden shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <NavLink to='/adopt'className="relative z-10 flex items-center justify-center gap-2">
                Adopt a Pet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <NavLink to='/rescue' className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto">
              Report Rescue
            </NavLink>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${stat.gradient} rounded-xl mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission Statement with Modern Cards */}
      <section id="mission" data-animate className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-emerald-500 hover:scale-105">
                <p className="text-slate-700 leading-relaxed">
                  At Well Care Animal Rescue, we believe that every animal carries a story—one of resilience, hope, and the desire to be loved. Our mission is to save lives, create families, and offer every animal the second chance they truly deserve.
                </p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 hover:scale-105">
                <p className="text-slate-700 leading-relaxed">
                  With compassion at the heart of everything we do, we rescue, rehabilitate, and rehome animals who have been abandoned, neglected, or forgotten. We see their potential, their spirit, and their capacity for unconditional love.
                </p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 hover:scale-105">
                <p className="text-slate-700 leading-relaxed">
                  Every wagging tail, gentle purr, and trusting gaze reminds us why we are here: to open doors, mend hearts, and bring together animals and families who were always meant to find one another.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img 
                  src={HealthyLives} 
                  alt="Healthy Lives" 
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-black mb-2">
                    Healthy Lives Start Here
                  </h3>
                  <p className="text-white/90">
                    A world filled with care and love becomes safer for all living beings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {impactStats.slice(0, 2).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-200">
                      <div className={`inline-flex p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-black text-slate-900 mb-2">{stat.number}</div>
                      <div className="text-slate-600 font-semibold">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Conservation Notice - Redesigned */}
      <section className="py-16 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                  Wildlife Conservation Notice
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong className="text-slate-900">Wildlife animals including snakes, turtles, crocodiles, and wild birds are NOT available for adoption.</strong> Under wildlife protection laws, these species must be rescued, rehabilitated, and released back to their natural habitats. Keeping wildlife as pets is illegal and harmful to conservation efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animal Images Gallery */}
      <section className="py-16 bg-white">
        <h1 className='bg-white text-black text-5xl pt-6 mt-3 pb-5 font-bold text-center mb-10'>Animal welfare is at the heart of everything we do</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animalImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square">
                <img 
                  src={image} 
                  alt={`Rescue animal ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animal Categories - Modern Grid */}
      <section id="categories" data-animate className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Animals We Rescue
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized care for diverse species with unique needs and legal considerations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {animalCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${category.bgGradient} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${category.borderColor} hover:scale-105`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative p-8">
                    <div className={`inline-flex p-4 ${category.iconBg} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {category.title}
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {category.animals.map((animal, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                          <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                          <span>{animal}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/50 shadow-lg">
                      <p className={`${category.statusColor} font-black text-center`}>
                        {category.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rescue Process - Timeline Style with Photos */}
      <section id="process" data-animate className="py-24 bg-gradient-to-b border-t border-t-gray-900 from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Our Rescue Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From emergency response to forever homes—every step designed with expertise and compassion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rescueProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
                >
                  {/* Image Container with Overlay */}
                  {step.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      
                      {/* Step Number Badge */}
                      <div className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {step.number}
                      </div>

                      {/* Icon in bottom right */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Fallback for steps without images */}
                  {!step.image && (
                    <div className={`h-48 ${step.bgPattern} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-20 h-20 text-slate-300 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {step.number}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gray-400 text-black border-t border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-black mb-6">
            Join Our Mission Today
          </h2>
          <p className="text-2xl text-black max-w-3xl mx-auto mb-12">
            Whether through adoption, volunteering, or donations—you can make a difference in an animal's life
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group px-10 py-5 bg-white text-emerald-600 font-black rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-2xl text-lg">
              <NavLink to='/volunteer' className="flex items-center justify-center gap-2">
                Volunteer With Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </button>
            <NavLink to="/donate" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-black rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl text-lg">
              Donate Now
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Stories of Hope
            </h2>
            <p className="text-xl text-white/80">
              Real experiences from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-white font-bold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;