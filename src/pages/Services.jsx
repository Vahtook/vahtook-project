import React from "react";

const Services = () => {
  return (
    <div className="min-h-screen py-16 px-6 bg-white text-center">
      <h1 className="text-3xl font-bold">Our Services</h1>
      <p className="text-gray-500 mt-2">
        Choose the service that fits your needs
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="border rounded-xl p-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
              <i className="fas fa-building"></i>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Vahtook for Brands</h3>
          <p className="text-gray-500 mt-1">
            Enterprise logistics solutions for businesses of all sizes
          </p>
          <ul className="mt-4 text-left space-y-1">
            <li>• Bulk shipments</li>
            <li>• Priority support</li>
            <li>• Custom pricing</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Vahtook for Individuals</h3>
          <p className="text-gray-500 mt-1">
            Personal delivery and moving services for your everyday needs
          </p>
          <ul className="mt-4 text-left space-y-1">
            <li>• Home delivery</li>
            <li>• Personal moves</li>
            <li>• Instant booking</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="border rounded-xl p-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Vahtook for SMEs</h3>
          <p className="text-gray-500 mt-1">
            Tailored logistics solutions for small and medium enterprises
          </p>
          <ul className="mt-4 text-left space-y-1">
            <li>• Flexible plans</li>
            <li>• Business accounts</li>
            <li>• Volume discounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
