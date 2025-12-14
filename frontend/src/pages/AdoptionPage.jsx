
import React from 'react';
import { CheckCircle, Clock, Mail, Phone } from 'lucide-react';

export default function AdoptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Application Received!
          </h1>
          <p className="text-blue-100 text-lg">
            Thank you for your interest in adoption
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We appreciate you taking the time to complete our adoption application. 
              Your information has been successfully submitted and is now being reviewed 
              by our team.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our dedicated adoption coordinators will carefully review your application 
              and get back to you with next steps.
            </p>
          </div>

          {/* Timeline Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Expected Response Time
                </h3>
                <p className="text-gray-700 text-base">
                  You can expect to hear from us within <span className="font-semibold text-blue-600">24-48 hours</span>.
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
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <p className="text-gray-700 pt-1">
                  Our team reviews your application and checks all provided information
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <p className="text-gray-700 pt-1">
                  We'll contact you via email or phone to discuss the next steps
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <p className="text-gray-700 pt-1">
                  If approved, we'll schedule a meet-and-greet or home visit
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">
              Questions in the Meantime?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">adoption@example.com</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
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
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}