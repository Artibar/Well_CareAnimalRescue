import React from 'react';
import { Heart, Clock, AlertCircle, Mail, Phone } from 'lucide-react';

export default function RescuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Thank You for Reaching Out!
          </h1>
          <p className="text-rose-100 text-lg">
            Your rescue request has been received
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We truly appreciate you taking the time to report an animal in need. 
              Your compassion and quick action can make all the difference in saving a life.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our rescue team has received your submission and will review the details 
              immediately to determine the best course of action.
            </p>
          </div>

          {/* Urgent Notice Box */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Emergency Situations
                </h3>
                <p className="text-gray-700 text-base">
                  If this is a life-threatening emergency, please call our 24/7 emergency 
                  hotline at <span className="font-semibold text-amber-700">(555) 911-PETS</span> immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Box */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-rose-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Response Time
                </h3>
                <p className="text-gray-700 text-base">
                  Our rescue team will contact you within <span className="font-semibold text-rose-600">24-48 hours</span> to 
                  discuss the situation and coordinate rescue efforts.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 text-xl mb-4">
              What Happens Next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 font-semibold text-sm">1</span>
                </div>
                <p className="text-gray-700 pt-1">
                  Our team evaluates the urgency and location details you provided
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 font-semibold text-sm">2</span>
                </div>
                <p className="text-gray-700 pt-1">
                  We'll reach out to you for any additional information or updates
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 font-semibold text-sm">3</span>
                </div>
                <p className="text-gray-700 pt-1">
                  Our rescue team dispatches to the location to help the animal
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 font-semibold text-sm">4</span>
                </div>
                <p className="text-gray-700 pt-1">
                  We'll keep you updated on the rescue outcome and the animal's condition
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">
              Need to Reach Us?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-rose-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">rescue@example.com</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-rose-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-rose-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-rose-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}