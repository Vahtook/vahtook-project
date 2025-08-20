import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen py-16 px-6 bg-white text-center">
      <h1 className="text-3xl font-bold">Why Choose Vahtook?</h1>
      <p className="text-gray-500 mt-2">
        We're committed to providing the best logistics experience
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Item 1 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Safe & Secure</h3>
            <p className="text-gray-500">Your items are insured and handled with utmost care</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-clock"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-gray-500">Quick and efficient delivery solutions for urgent needs</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Best Prices</h3>
            <p className="text-gray-500">Competitive pricing with transparent cost structure</p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-star"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Top Rated</h3>
            <p className="text-gray-500">Highly rated by thousands of satisfied customers</p>
          </div>
        </div>

        {/* Item 5 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-truck"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Reliable Fleet</h3>
            <p className="text-gray-500">Well-maintained vehicles and professional drivers</p>
          </div>
        </div>

        {/* Item 6 */}
        <div className="flex items-start gap-4 border rounded-xl p-6 hover:-translate-y-1 transition duration-200">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-md text-orange-500 text-xl">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-gray-500">Round-the-clock customer support for all your queries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
