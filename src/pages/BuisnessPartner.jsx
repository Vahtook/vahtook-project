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
      document: null,
    });
  };

  return (
    <section 
      className="min-h-screen py-6 px-4 relative flex items-center justify-start" 
      style={{ 
        backgroundImage: `url("${businessPartnerImage}")`, 
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0'
      }}
    >
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
    </section>
  );
}
