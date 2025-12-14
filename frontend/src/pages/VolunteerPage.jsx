
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Optional icon—remove if not used

const VolunteerPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center space-y-5">
        
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />

        <h1 className="text-3xl font-bold text-green-700">
          Thank You for Applying!
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Your volunteer application has been submitted successfully.
          <br />
          Our team will review your information and contact you shortly.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
