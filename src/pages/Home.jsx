import React, { useState } from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EB9900] via-[#FF9D00] to-[#E67E00] overflow-hidden">

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
                <div className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-lg py-1 whitespace-nowrap">
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
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400 placeholder-gray-500"
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
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400 placeholder-gray-500"
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
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400"
                      />
                    </div>

                    {/* Time Input */}
                    <div className="relative">
                      <input
                        type="time"
                        defaultValue={new Date().toTimeString().slice(0,5)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all text-sm text-gray-900 bg-white hover:border-gray-400"
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
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all appearance-none bg-white hover:border-gray-400 text-sm text-gray-900">
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
                <button className="w-full bg-[#EB9900] hover:bg-[#d68600] text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2">
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

const FAQSection = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What weight categories of vehicles are available for booking?",
      answer: "We offer vehicles across multiple weight categories: Light-duty vehicles (up to 3.5 tons) including vans and small trucks, Medium-duty vehicles (3.5-7.5 tons) for larger cargo loads, Heavy-duty vehicles (7.5-26 tons) for industrial transportation, and Extra-heavy vehicles (26+ tons) for specialized heavy cargo and construction materials."
    },
    {
      question: "How do I choose the right vehicle size for my cargo weight?",
      answer: "Our smart booking system helps you select the optimal vehicle based on your cargo specifications. Simply enter your cargo weight, dimensions, and type during booking. Light cargo (under 500kg) works with vans, medium loads (500kg-2 tons) require small trucks, heavy items (2-10 tons) need medium trucks, and industrial cargo (10+ tons) requires our heavy-duty fleet."
    },
    {
      question: "What's the maximum weight capacity for each vehicle type?",
      answer: "Our fleet includes: Cargo vans (up to 1,500kg), Small trucks (up to 3,500kg), Medium trucks (up to 7,500kg), Large trucks (up to 26,000kg), and Heavy haul trucks (26,000kg+). Each vehicle listing shows exact payload capacity, dimensions, and specialized equipment available."
    },
    {
      question: "Are there additional fees for heavy cargo transportation?",
      answer: "Pricing varies by vehicle category and cargo specifications. Light-duty vehicles have standard rates, while heavy-duty transportation may include additional fees for specialized handling, permits, or escort vehicles. Our transparent pricing shows all costs upfront during booking, including any weight-based surcharges or special equipment fees."
    },
    {
      question: "Do you provide loading equipment for different weight categories?",
      answer: "Yes, we provide appropriate loading equipment based on your cargo weight. This includes hand trucks and dollies for light items, hydraulic lift gates for medium loads, forklifts and cranes for heavy cargo, and specialized rigging equipment for extra-heavy items. Equipment availability is shown during vehicle selection."
    },
    {
      question: "What safety measures are in place for heavy cargo transport?",
      answer: "Our heavy cargo transport includes comprehensive safety protocols: weight distribution analysis, proper cargo securing with rated tie-downs, load stability checks, route planning for weight restrictions, certified drivers with heavy vehicle endorsements, and real-time monitoring. All vehicles undergo regular safety inspections and maintenance."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <span className="text-brand-orange font-semibold text-lg">Questions? Look here.</span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our logistics services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-5 py-4 text-left flex items-center group focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    openItems[index] 
                      ? 'bg-[#EB9900] text-white' 
                      : 'bg-orange-100 text-[#EB9900] group-hover:bg-orange-200'
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openItems[index] ? 'rotate-180' : 'rotate-0'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 group-hover:text-brand-orange transition-colors duration-200">
                    {item.question}
                  </h3>
                </div>
              </button>

              {/* Answer Content */}
              <div className={`transition-all duration-300 ease-in-out ${
                openItems[index] 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-5 pb-4">
                  <div className="ml-9">
                    <div className="pl-4 py-2">
                      <p className="text-gray-600 leading-6 text-sm">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-10 text-center">
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Our logistics experts are here to help you choose the right vehicle for your needs.
            </p>
            <button className="bg-[#EB9900] hover:bg-[#d68600] text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB9900] focus:ring-offset-2">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FAQSection />
    </div>
  );
};

export default Home;
