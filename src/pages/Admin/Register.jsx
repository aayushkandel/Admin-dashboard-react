import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up submitted:', formData);
    // Add your signup logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          {/* SVG Icon for stacked boxes */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
            <path d="M24 4L44 14L24 24L4 14L24 4Z" fill="#F97316" />
            <path d="M4 14V24L24 34V24L4 14Z" fill="#1F2937" />
            <path d="M44 14V24L24 34V24L44 14Z" fill="#374151" />
            <path d="M4 24V34L24 44V34L4 24Z" fill="#111827" />
            <path d="M44 24V34L24 44V34L44 24Z" fill="#1F2937" />
          </svg>
          
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              In<span className="text-orange-500">App</span>
            </h1>
            <span className="text-xs text-gray-500 -mt-1">Inventory App</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
          Create your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms and privacy
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
          >
            Sign up
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-orange-500 hover:text-orange-600">
            Sign in
          </a>
        </div>

      </div>
    </div>
  );
};

export default Register;