import React from 'react';
import { Heart, Mail, FileText, Share2, Facebook, Twitter, Instagram } from 'lucide-react';

export default function DonationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 animate-pulse">
              <Heart className="w-16 h-16 text-emerald-500 fill-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Thank You for Your Generosity!
          </h1>
          <p className="text-emerald-100 text-lg">
            Your donation makes a real difference
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We are incredibly grateful for your generous contribution. Your support enables 
              us to continue our mission of rescuing, caring for, and finding loving homes 
              for animals in need.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every donation, no matter the size, has a direct impact on the lives we touch 
              and the animals we save.
            </p>
          </div>

          {/* Impact Section */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-4 text-center">
              Your Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-1">50+</div>
                <p className="text-gray-600 text-sm">Animals Rescued</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-1">100+</div>
                <p className="text-gray-600 text-sm">Medical Treatments</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-1">200+</div>
                <p className="text-gray-600 text-sm">Forever Homes</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center mt-4">
              Thanks to supporters like you this year
            </p>
          </div>

          {/* Receipt Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Receipt & Tax Information
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  A confirmation email with your donation receipt has been sent to your email 
                  address. This receipt can be used for tax-deductible purposes.
                </p>
                <p className="text-gray-600 text-sm">
                  Please allow a few minutes for the email to arrive. Don't forget to check 
                  your spam folder if you don't see it.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 text-xl mb-4">
              Ways to Stay Connected
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-gray-700 pt-1">
                  Subscribe to our newsletter to receive updates on the animals you've helped
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Share2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-gray-700 pt-1">
                  Follow us on social media to see rescue stories and success updates
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-gray-700 pt-1">
                  Consider becoming a monthly donor for ongoing impact
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-4 text-center">
              Follow Our Journey
            </h3>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Return to Homepage
            </button>
            <button 
              onClick={() => window.location.href = '/share'}
              className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-200"
            >
              Share Our Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}