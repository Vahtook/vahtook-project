import React, { useState } from "react";
import { Upload } from "lucide-react";

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
    <section className="min-h-screen bg-gradient-to-br from-[#38e4d2] to-[#fb9108] py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          Connect with <span className="text-[#ff9d00]">Vaht∞k</span> for Business
        </h1>
        {/* <h1 className="text-3xl font-bold text-center mb-2">
           <span className="text-[#ff9d00]">Vaht∞k</span>{" "}
           <span className="text-black">Driver Partner Registration</span>
         </h1> */}
        <p className="text-gray-700 text-center mt-2">
          Partner with us for reliable logistics tailored to your company needs.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Type</label>
            <input
              type="text"
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="e.g., Manufacturing, Retail, E-commerce"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type of Vehicle Required</label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
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
            <label className="block text-sm font-medium text-gray-700">Number of Trips per Day</label>
            <input
              type="number"
              name="tripsPerDay"
              value={form.tripsPerDay}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="e.g., 5"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Enter business email"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="10-digit phone number"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Enter business location"
              required
            />
          </div>
          {/* Logistic Requirements */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Logistic Requirements
  </label>
  <textarea
    name="requirements"
    value={form.requirements}
    onChange={handleChange}
    rows={4}
    placeholder="Describe your logistic needs (e.g., daily delivery routes, specific vehicle capacity, timelines)..."
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ff9d00] focus:ring focus:ring-[#ff9d00]/30"
  ></textarea>
</div>


          {/* Upload Document */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Upload Documents (optional)
  </label>
  <input
    type="file"
    name="document"
    onChange={handleChange}
    className="block w-full text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-[#ff9d00] file:text-white
               hover:file:bg-[#e68a00]"
  />
</div>


          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#ff9d00] text-white font-semibold shadow-md hover:bg-[#e68a00] transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
