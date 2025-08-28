import React, { useState } from "react";
import { Upload } from "lucide-react";
import businessPartnerImage from "../assets/business-page-1.jpg";

export default function BusinessPartner() {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    vehicleType: "",
    tripsPerDay: "",
    email: "",
    contact: "",
    location: "",
    requirements: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Business Partner Form Submitted:", form);
    alert("✅ Your request has been submitted successfully!");
    setForm({
      businessName: "",
      businessType: "",
      vehicleType: "",
      tripsPerDay: "",
      email: "",
      contact: "",
      location: "",
      requirements: "",
      document: null,
    });
  };

  return (
    <div>
    <section 
      className="relative h-[60vh] sm:h-[70vh] lg:min-h-screen business-partner-background overflow-hidden w-full" 
      style={{ 
        backgroundImage: `url("${businessPartnerImage}")`, 
      }}
    >
      {/* Desktop Layout - Form overlay on image */}
      <div className="hidden lg:flex items-center justify-start h-full">
        <div className="max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/40 ml-16">
          <h1 className="text-xl font-bold text-center mb-1">
            Connect with <span className="text-[#ff9d00]">Vahtook</span> for Business
          </h1>
          <p className="text-gray-600 text-center text-xs mb-3">
            Partner with us for reliable logistics tailored to your company needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Business Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter your business name"
                required
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Business Type</label>
              <input
                type="text"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="e.g., Manufacturing, Retail, E-commerce"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Type of Vehicle Required</label>
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="Two-wheeler">Two-wheeler</option>
                <option value="Three-wheeler">Three-wheeler</option>
                <option value="Small Van">Small Van</option>
                <option value="Large Van / LCV">Large Van / LCV</option>
                <option value="Truck">Truck</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Trips Per Day */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Number of Trips per Day</label>
              <input
                type="number"
                name="tripsPerDay"
                value={form.tripsPerDay}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="e.g., 5"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Business Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter business email"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="10-digit phone number"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter business location"
                required
              />
            </div>
            {/* Logistic Requirements */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Logistic Requirements
              </label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={2}
                placeholder="Describe your logistic needs..."
                className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Upload Document */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Upload Documents (optional)
              </label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="block w-full text-xs text-gray-700
                           file:mr-2 file:py-1 file:px-2
                           file:rounded-md file:border-0
                           file:text-xs file:font-semibold
                           file:bg-[#ff9d00] file:text-white
                           hover:file:bg-[#e68a00]"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-1">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68a00] hover:to-[#ff9d00] text-white py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Only hero content */}
      <div className="lg:hidden relative h-full">
        {/* Business Partner heading - Top Center */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg px-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
            Connect with <span className="text-[#ff9d00] drop-shadow-lg shadow-black/40" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Vahtook</span> for Business
          </h1>
        </div>
      </div>
    </section>

    {/* Mobile Business Partner Form Section - Separate section below hero */}
    <div className="lg:hidden bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4">
        <div className="w-full bg-white/98 backdrop-blur-lg shadow-2xl rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-white/30">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ff9d00]/10 via-[#ff9d00]/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ff9d00]/8 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
          
          {/* Header */}
          <div className="text-center mb-4 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Connect with <span className="text-[#ff9d00]">Vahtook</span>
            </h1>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Partner with us for reliable logistics
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] rounded-full mx-auto mt-2"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 max-h-64 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter your business name"
                required
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
              <input
                type="text"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="e.g., Manufacturing, Retail, E-commerce"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Vehicle Required</label>
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all appearance-none bg-white"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="Two-wheeler">Two-wheeler</option>
                <option value="Three-wheeler">Three-wheeler</option>
                <option value="Small Van">Small Van</option>
                <option value="Large Van / LCV">Large Van / LCV</option>
                <option value="Truck">Truck</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Trips Per Day */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Trips per Day</label>
              <input
                type="number"
                name="tripsPerDay"
                value={form.tripsPerDay}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="e.g., 5"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter business email"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="10-digit phone number"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all"
                placeholder="Enter business location"
                required
              />
            </div>

            {/* Logistic Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Logistic Requirements
              </label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your logistic needs..."
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Upload Document */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Documents (optional)
              </label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="block w-full text-sm text-gray-700
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-[#ff9d00] file:text-white
                           hover:file:bg-[#e68a00] file:transition-colors"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68a00] hover:to-[#ff9d00] text-white py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Submit Request</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}