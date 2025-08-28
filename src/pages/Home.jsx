import React, { useState } from 'react';
import { Shield, Clock, IndianRupee, Star, Truck, Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Hero-orange.jpg';

// Separate Booking Form Component
const BookingFormCard = () => {
  return (
    <div className="bg-white rounded-xl p-3 lg:p-5 shadow-2xl border border-white/20 max-w-[280px] sm:max-w-xs w-full lg:max-w-sm relative overflow-hidden mx-auto lg:ml-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#EB9900]/10 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#EB9900]/5 to-transparent rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
      
      {/* Form Header */}
      <div className="text-center mb-3 sm:mb-4 relative z-10">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">Quick Booking</h3>
        <p className="text-xs text-gray-600">Get your ride in minutes</p>
      </div>
      <div className="space-y-2 sm:space-y-3 relative z-10">
        {/* Pickup Location */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm"></div>
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">From</label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 group-focus-within:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Pickup location"
              className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#EB9900]/20 focus:border-[#EB9900] outline-none transition-all duration-200 text-xs sm:text-sm text-gray-900 bg-white/80 hover:bg-white hover:border-gray-300 placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-sm"></div>
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">To</label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 group-focus-within:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Destination"
              className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#EB9900]/20 focus:border-[#EB9900] outline-none transition-all duration-200 text-xs sm:text-sm text-gray-900 bg-white/80 hover:bg-white hover:border-gray-300 placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm"></div>
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Schedule</label>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="relative group">
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#EB9900]/20 focus:border-[#EB9900] outline-none transition-all duration-200 text-xs sm:text-sm text-gray-900 bg-white/80 hover:bg-white hover:border-gray-300 shadow-sm"
              />
            </div>
            <div className="relative group">
              <input
                type="time"
                defaultValue={new Date().toTimeString().slice(0,5)}
                className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#EB9900]/20 focus:border-[#EB9900] outline-none transition-all duration-200 text-xs sm:text-sm text-gray-900 bg-white/80 hover:bg-white hover:border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] rounded-full shadow-sm"></div>
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Vehicle</label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff9d00] group-focus-within:text-[#ffb84d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 9l4-4.5L15 9m4 0h1a1 1 0 011 1v6a1 1 0 01-1 1h-1M7 9H6a1 1 0 00-1 1v6a1 1 0 001 1h1m0-8V6a1 1 0 011-1h4a1 1 0 011 1v3M7 9h8" />
              </svg>
            </div>
            <select className="w-full pl-8 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#EB9900]/20 focus:border-[#EB9900] outline-none transition-all duration-200 appearance-none bg-white/80 hover:bg-white hover:border-gray-300 text-xs sm:text-sm text-gray-900 shadow-sm">
              <option value="">Choose vehicle type</option>
              <option value="motorcycle">🏍️ Motorcycle</option>
              <option value="van">🚐 Van</option>
              <option value="truck">🚛 Truck</option>
              <option value="pickup">🛻 Pickup Truck</option>
              <option value="trailer">🚜 Trailer</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#EB9900] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <button className="w-full bg-gradient-to-r from-[#EB9900] to-[#ff8800] hover:from-[#d68600] hover:to-[#e07700] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] mt-2 sm:mt-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative flex items-center justify-center space-x-2">
            <span>Book Your Ride</span>
            <svg className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="w-full">
      {/* Hero Image Section */}
      <div 
        className="relative h-[60vh] sm:h-[70vh] lg:min-h-screen hero-background overflow-hidden w-full" 
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Mobile-specific background overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10 md:bg-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-16 z-10">
          {/* Tagline at the very top - Desktop Only */}
          <div className="hidden lg:block text-center pt-2 sm:pt-4 lg:pt-2 pb-0 sm:pb-1 lg:pb-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-lg px-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
              Heavy or Light <span className="text-[#EB9900] whitespace-nowrap drop-shadow-lg shadow-black/40" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>We Move It Right</span>
            </h1>
          </div>

          {/* Desktop/Tablet Layout - Two columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-start space-y-8 py-12">
              <div className="space-y-4 mt-72 ml-16">
                <p className="text-base text-white leading-snug max-w-xl font-medium drop-shadow-lg">
                  Connecting you to trusted drivers across the city.
                  Reliable transport solutions, tailored for you.
                </p>
              </div>
            </div>

            {/* Right Column - Booking Form (Desktop Only) */}
            <div className="relative pl-8 xl:pl-12 flex justify-end -mt-16">
              <BookingFormCard />
            </div>
          </div>

          {/* Mobile/Tablet Layout - Only content, no form */}
          <div className="lg:hidden flex flex-col justify-center items-center min-h-[40vh] sm:min-h-[50vh]">
            <div className="text-center space-y-3 sm:space-y-4 mt-32 sm:mt-40">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg px-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                Heavy or Light <span className="text-[#EB9900] whitespace-nowrap drop-shadow-lg shadow-black/40" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>We Move It Right</span>
              </h1>
              <p className="text-[10px] sm:text-[10px] text-white leading-snug max-w-lg font-medium drop-shadow-lg px-4">
                Connecting you to trusted drivers across the city.
                Reliable transport solutions, tailored for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Form Section - Separate section below hero */}
      <div className="lg:hidden bg-gray-50 py-6">
        <div className="max-w-md mx-auto px-4 flex justify-center items-center">
          <BookingFormCard />
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const navigate = useNavigate();
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
    <div>
    
    {/* ///////////////////////////////////////////////////////////////////////////// */}
    
      {/*services */}
   <div className="py-16 px-6 bg-white text-center">
   <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
   <p className="text-gray-500 mt-2 text-lg">
    Choose the service that fits your needs
  </p>

  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Card 1 */}
    <div className="border rounded-2xl p-6 max-w-xs mx-auto shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 bg-white">
      <div className="flex justify-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 rounded-xl text-[#ff9d00]n` text-xl shadow-inner">
          <i className="fas fa-building"></i>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        Vahtook for Brands
      </h3>
      <p className="text-gray-500 mt-2 text-sm leading-relaxed">
        Enterprise logistics solutions for businesses of all sizes
      </p>
      <ul className="mt-5 flex flex-col items-center gap-2 text-gray-700 font-medium">
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Bulk shipments
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Priority support
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Custom pricing
        </li>
      </ul>
    </div>

    {/* Card 2 */}
    <div className="border rounded-2xl p-6 max-w-xs mx-auto shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 bg-white">
      <div className="flex justify-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 rounded-xl text-[#ff9d00]n` text-xl shadow-inner">
          <i className="fas fa-user"></i>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        Vahtook for Individuals
      </h3>
      <p className="text-gray-500 mt-2 text-sm leading-relaxed">
        Personal delivery and moving services for your everyday needs
      </p>
      <ul className="mt-5 flex flex-col items-center gap-2 text-gray-700 font-medium">
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Home delivery
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Personal moves
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Instant booking
        </li>
      </ul>
    </div>

    {/* Card 3 */}
    <div className="border rounded-2xl p-6 max-w-xs mx-auto shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 bg-white">
      <div className="flex justify-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 rounded-xl text-[#ff9d00]n` text-xl shadow-inner">
          <i className="fas fa-users"></i>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        Vahtook for SMEs
      </h3>
      <p className="text-gray-500 mt-2 text-sm leading-relaxed">
        Tailored logistics solutions for small and medium enterprises
      </p>
      <ul className="mt-5 flex flex-col items-center gap-2 text-gray-700 font-medium">
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Flexible plans
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Business accounts
        </li>
        <li className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Volume discounts
        </li>
      </ul>
    </div>
  </div>
</div>
<div className="py-16 px-6 bg-gray-50 text-center">
  {/* Heading */}
  <h1 className="text-4xl font-extrabold text-gray-800">
    Why Choose <span className="text-[#ff9d00]">Vahtook?</span>
  </h1>
  <p className="text-gray-600 mt-3 text-lg">
    We're committed to providing the{" "}
    <span className="font-semibold">best logistics experience</span>
  </p>

  {/* Grid */}
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Item 1 */}
    <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">


         <i className="fas fa-shield-alt"></i> 
      </div>
      <div className="text-left">
        <h3 className="font-bold text-gray-800 text-lg">Safe & Secure</h3>
        <p className="text-gray-500 text-sm">
          Your items are insured and handled with utmost care
        </p>
      </div>
    </div>

    {/* Item 2 */}
    <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">
         <i className="fas fa-clock"></i> 
      </div>
      <div className="text-left">
        <h3 className="font-bold text-gray-800 text-lg">Fast Delivery</h3>
        <p className="text-gray-500 text-sm">
          Quick and efficient delivery solutions for urgent needs
        </p>
      </div>
    </div>

   {/* Item 3 */}
<div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
  <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">

    <IndianRupee size={28} /> {/* Changed from Dollar to Rupee */}
  </div>
  <div className="text-left">
    <h3 className="font-bold text-gray-800 text-lg">Best Prices</h3>
    <p className="text-gray-500 text-sm">
      Competitive pricing with transparent cost structure
    </p>
  </div>
</div>


    {/* Item 4 */}
    <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">


         <i className="fas fa-star"></i> 
      </div>
      <div className="text-left">
        <h3 className="font-bold text-gray-800 text-lg">Top Rated</h3>
        <p className="text-gray-500 text-sm">
          Highly rated by thousands of satisfied customers
        </p>
      </div>
    </div>

    {/* Item 5 */}
    <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">

         <i className="fas fa-truck"></i> 
      </div>
      <div className="text-left">
        <h3 className="font-bold text-gray-800 text-lg">Reliable Fleet</h3>
        <p className="text-gray-500 text-sm">
          Well-maintained vehicles and professional drivers
        </p>
      </div>
    </div>

    {/* Item 6 */}
    <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-xl text-[#ff9d00] text-2xl">

        <Phone size={28} />{/* <i className="fas fa-phone-alt"></i> */}
      </div>
      <div className="text-left">
        <h3 className="font-bold text-gray-800 text-lg">24/7 Support</h3>
        <p className="text-gray-500 text-sm">
          Round-the-clock customer support for all your queries
        </p>
      </div>
    </div>
  </div>
</div>



    {/* //////////////////////////////////////////////////////////////////// */}
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h1>
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
                className="w-full px-5 py-4 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-all duration-200"
              >
                <h3 className="text-base font-medium text-gray-900 group-hover:text-brand-orange transition-colors duration-200">
                  {item.question}
                </h3>
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
              </button>

              {/* Answer Content */}
              <div className={`transition-all duration-300 ease-in-out ${
                openItems[index] 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-5 pb-4">
                  <div className="pl-4 py-2">
                    <p className="text-gray-600 leading-6 text-sm">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Contact Section */}
        <div className="mt-10 text-center">
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Our logistics experts are here to help you choose the right vehicle for your needs.
            </p>
            <button 
              onClick={() => navigate('/support')}
              className="bg-[#EB9900] hover:bg-[#d68600] text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EB9900] focus:ring-offset-2"
            >
              Contact Support
            </button>
          </div>
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
