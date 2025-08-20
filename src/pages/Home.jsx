import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-orange-500 bg-hero-gradient overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center min-h-[85vh]">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-8 lg:space-y-10 py-8 lg:py-0">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.3] tracking-tight">
                <div className="text-gray-900 mb-2">Heavy or Light</div>
                <div className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-lg py-1">
                  We Move It Right
                </div>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-black leading-relaxed max-w-xl font-medium">
                Professional logistics and delivery services at your fingertips.
                Fast, reliable, and affordable vehicle booking for all your
                transportation needs.
              </p>
              
              {/* Key Features */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-sm lg:text-base text-black font-medium">24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-sm lg:text-base text-black font-medium">Real-time Tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-sm lg:text-base text-black font-medium">Instant Booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="relative lg:pl-4 order-first lg:order-last">
            {/* Booking Form Card */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-xl border border-gray-200 max-w-sm mx-auto lg:max-w-none">
              <div className="space-y-4">
                {/* Pickup Location */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    <label className="text-xs font-medium text-gray-800 uppercase tracking-wide">Pickup location</label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter pickup address"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-logistics-orange focus:border-logistics-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Dropoff Location */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <label className="text-xs font-medium text-gray-800 uppercase tracking-wide">Dropoff location</label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter destination"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-logistics-orange focus:border-logistics-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <label className="text-xs font-medium text-gray-800 uppercase tracking-wide">Schedule</label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Date Input */}
                    <div className="relative">
                      <input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-logistics-orange focus:border-logistics-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400"
                      />
                    </div>

                    {/* Time Input */}
                    <div className="relative">
                      <input
                        type="time"
                        defaultValue={new Date().toTimeString().slice(0,5)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-logistics-orange focus:border-logistics-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 9l4-4.5L15 9m4 0h1a1 1 0 011 1v6a1 1 0 01-1 1h-1M7 9H6a1 1 0 00-1 1v6a1 1 0 001 1h1m0-8V6a1 1 0 011-1h4a1 1 0 011 1v3M7 9h8" />
                    </svg>
                    <label className="text-xs font-medium text-gray-800 uppercase tracking-wide">Vehicle type</label>
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-logistics-orange focus:border-logistics-orange outline-none transition-all appearance-none bg-white hover:border-gray-400 text-sm text-gray-900">
                      <option value="">Select vehicle type</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="pickup">Pickup Truck</option>
                      <option value="trailer">Trailer</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button className="w-full bg-logistics-orange hover:bg-logistics-orange-dark text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
