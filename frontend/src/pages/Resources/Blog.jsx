
import React, { useState } from 'react';
import { Calendar, User, Clock, Tag, Search } from 'lucide-react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import { toast } from 'react-hot-toast'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscribe= (e)=>{
    e.preventDefault()
    setIsSubscribed(true)
    setEmail('')
     toast.success('Subscribed to newsletter successfully!');
    try {
      window.toast.success('Subscribed to newsLetter Successfully!')
      setTimeout(()=>{
        setIsSubscribed(false)
      }, 3000)
    } catch (error) {
      toast.error('Subscription error:', error);
    }
  }

  const categories = ['all', 'rescue stories', 'pet care', 'events', 'news', 'tips'];

  const blogPosts = [
    {
      id: 1,
      title: 'Meet Luna: A Heartwarming Rescue Story',
      excerpt: 'Discover how Luna went from being abandoned on the streets to finding her forever home with a loving family.',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      category: 'rescue stories',
      author: 'Sarah Johnson',
      date: '2024-12-05',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Winter Care Tips for Your Pets',
      excerpt: 'Essential advice to keep your furry friends safe, warm, and healthy during the cold winter months.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
      category: 'pet care',
      author: 'Dr. Michael Chen',
      date: '2024-12-03',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Upcoming Adoption Drive This Weekend',
      excerpt: 'Join us at Central Park this Saturday for our biggest adoption event of the year. Meet dozens of pets looking for homes.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
      category: 'events',
      author: 'Emily Rodriguez',
      date: '2024-12-08',
      readTime: '3 min read'
    },
    {
      id: 4,
      title: 'New Partnership with Local Veterinary Clinics',
      excerpt: 'We are excited to announce partnerships with five local vet clinics to provide free health checkups for rescued animals.',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
      category: 'news',
      author: 'Admin Team',
      date: '2024-12-01',
      readTime: '4 min read'
    },
    {
      id: 5,
      title: 'Understanding Your Cat\'s Behavior',
      excerpt: 'Learn to decode your feline friend\'s body language and behaviors to build a stronger bond.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      category: 'tips',
      author: 'Dr. Lisa Anderson',
      date: '2024-11-28',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Success: Max Finds His Forever Family',
      excerpt: 'After 8 months at our shelter, Max finally found the perfect family who understands his special needs.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      category: 'rescue stories',
      author: 'Jennifer Lee',
      date: '2024-11-25',
      readTime: '5 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-100 text-black font-bold py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & News</h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Stay updated with heartwarming stories, pet care tips, and the latest news from WellCare Animal Rescue.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-6 text-orange-100">
              Get the latest rescue stories, pet care tips, and news delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
               
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none" />
              <button type='submit' disabled={isSubscribed} className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                 {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    <Footer/>
    </>
  );
};

export default Blog;