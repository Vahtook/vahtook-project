import React, { useState } from "react";
import bgImage from "../assets/Driver-partner-1.png";

// Field Component
function Field({ label, error, children, icon }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center space-x-2">
        {icon && <span className="text-[#ff9d00]">{icon}</span>}
        <span>{label}</span>
      </label>
      <div className="relative">
        {children}
        {error && (
          <div className="absolute -bottom-5 left-0 flex items-center space-x-1">
            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-red-500 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DriverPartnerForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    vehicleType: "",
    experience: "",
    serviceAreas: "",
    expectedRate: "",
    documents: null,
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const vehicleOptions = ["Truck", "Mini Truck", "Pickup Van", "Tempo"];

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.vehicleType) newErrors.vehicleType = "Select a vehicle type";
    if (!form.experience) newErrors.experience = "Enter years of experience";
    if (!form.agree) newErrors.agree = "You must agree before submitting";
    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", form);
      setSubmitted(true);
    }
  };

  // Handle second submit (reset or any other action)
  const handleSecondSubmit = () => {
    alert("Second submit button clicked!");
    // Example: reset the form
    setForm({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      vehicleType: "",
      experience: "",
      serviceAreas: "",
      expectedRate: "",
      documents: null,
      agree: false,
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div>
      {/* Hero Background Section */}
      <div 
        className="relative h-[60vh] sm:h-[70vh] lg:min-h-screen driver-partner-background overflow-hidden w-full" 
        style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f3f4f6'
        }}
      >
        {/* Mobile-specific background overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10 md:bg-transparent"></div>
        
        {/* Desktop Layout - Form on the right (hidden on mobile) */}
        <div className="hidden lg:flex relative min-h-screen items-center justify-end pr-8 lg:pr-16">
          <div className="w-full max-w-lg bg-white/98 backdrop-blur-lg shadow-2xl rounded-3xl p-8 relative overflow-hidden border border-white/30">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ff9d00]/10 via-[#ff9d00]/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ff9d00]/8 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
            
            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Join <span className="text-[#ff9d00]">Vahtook</span>
              </h1>
              <p className="text-gray-600 font-medium">
                Become a trusted logistics partner
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] rounded-full mx-auto mt-2"></div>
            </div>

          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <p className="text-green-600 font-medium text-sm">
                ✓ Registration submitted successfully!
              </p>
              <button
                onClick={handleSecondSubmit}
                className="bg-[#ff9d00] text-white py-2 px-4 rounded-md font-medium hover:bg-[#e68c00] transition-colors text-sm"
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 max-h-80 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Full Name */}
            <Field 
              label="Full Name" 
              error={errors.fullName}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            >
              <input
                id="full-name"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="Your full name"
              />
            </Field>

            {/* Email */}
            <Field 
              label="Email Address" 
              error={errors.email}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            >
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="your@email.com"
              />
            </Field>

            {/* Phone */}
            <Field 
              label="Phone Number" 
              error={errors.phone}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
            >
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="+91 98765 43210"
              />
            </Field>

            {/* City */}
            <Field 
              label="City" 
              error={errors.city}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            >
              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="Your city"
              />
            </Field>

            {/* Vehicle Type */}
            <Field 
              label="Vehicle Type" 
              error={errors.vehicleType}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 9l4-4.5L15 9m4 0h1a1 1 0 011 1v6a1 1 0 01-1 1h-1M7 9H6a1 1 0 00-1 1v6a1 1 0 001 1h1m0-8V6a1 1 0 011-1h4a1 1 0 011 1v3M7 9h8" /></svg>}
            >
              <div className="relative">
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 appearance-none cursor-pointer"
                >
                  <option value="">Choose your vehicle</option>
                  {vehicleOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </Field>

            {/* Experience */}
            <Field 
              label="Experience (years)" 
              error={errors.experience}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            >
              <input
                id="experience"
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="Years of driving experience"
                min="0"
                max="50"
              />
            </Field>

            {/* Service Areas */}
            <Field 
              label="Service Areas (optional)" 
              error={errors.serviceAreas}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
            >
              <textarea
                id="serviceAreas"
                name="serviceAreas"
                value={form.serviceAreas}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400 resize-none"
                placeholder="e.g., Mumbai, Pune, Nashik"
              />
            </Field>
            {/* Expected Rate */}
            <Field 
              label="Expected Rate (per trip/day)" 
              error={errors.expectedRate}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
            >
              <input
                type="text"
                name="expectedRate"
                value={form.expectedRate}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
                placeholder="₹500 per day or ₹100 per trip"
              />
            </Field>


            {/* File Upload */}
            <Field 
              label="Upload Documents (optional)" 
              error={errors.documents}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
            >
              <div className="relative">
                <input
                  id="documents"
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/30 hover:bg-gray-50 hover:border-[#ff9d00]/50 file:mr-3 file:rounded-lg file:border-0 file:bg-[#ff9d00] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#e68c00] file:transition-colors"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Supported: PDF, DOC, JPG, PNG (Max 5MB)
                </p>
              </div>
            </Field>

            {/* Terms & Conditions */}
            <div className="border-2 border-gray-200 rounded-xl p-4 max-h-40 overflow-y-auto text-xs text-gray-600 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <h2 className="font-semibold mb-2">Terms and Conditions *</h2>
              <p>
                <strong>1. Purpose</strong> The Fleet Owner agrees to provide
                vehicles for transportation and logistics services as and when
                required by the Company.
              </p>
              <p className="mt-2">
                <strong>2. Vehicle & Driver Obligations</strong> The Fleet Owner
                shall:
                <br /> (a) provide vehicles in roadworthy condition with valid
                registration, insurance, permits and fitness;
                <br /> (b) ensure that drivers hold valid driving licences and
                comply with all traffic and safety laws;
                <br /> (c) remain solely responsible for engaging drivers,
                making trip-wise payments to them, and ensuring compliance with
                all applicable statutory requirements;
                <br /> (d) ensure timely availability and cleanliness of
                vehicles.
              </p>
              <p className="mt-2">
                <strong>3. Rate Per Kilometer</strong> The rate payable shall be
                ₹ 25 / KM, mutually agreed at the time of onboarding and subject
                to revision by mutual consent.
              </p>
              <p className="mt-2">
                <strong>4. Trip & Distance Calculation</strong> Pickup and drop
                points shall be communicated verbally by the Company. Distance
                shall be calculated by the Company’s operations team and such
                calculation shall be final and binding.
              </p>
              <p className="mt-2">
                <strong>5. Payment Terms</strong>
                <br /> (a) Payment shall be made within 7 days from completion
                of trip or submission of invoice;
                <br /> (b) The Company may deduct amounts towards penalties,
                damages or breaches;
                <br /> (c) No advance payment shall be made unless specifically
                agreed in writing.
              </p>
              <p className="mt-2">
                <strong>6. Liability & Indemnity</strong> The Fleet Owner shall
                be solely liable for any accident, damage, loss or legal
                violation arising out of the vehicle or driver and shall
                indemnify and hold harmless the Company against any third-party
                claims.
              </p>
              <p className="mt-2">
                <strong>7. Term & Termination</strong> This Agreement shall
                remain in force unless terminated by either Party by giving
                seven (7) days’ written notice. Termination shall not affect
                accrued rights or liabilities of either Party.
              </p>
              <p className="mt-2">
                <strong>8. Governing Law & Jurisdiction</strong> This Agreement
                shall be governed by the laws of India and the courts at Nashik,
                Maharashtra shall have exclusive jurisdiction.
              </p>
            </div>

            <div className="flex items-start gap-3 mt-4 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
              <input
                id="agree"
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="h-5 w-5 rounded-md border-2 border-gray-300 text-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:border-[#ff9d00] transition-all duration-200 mt-0.5"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 font-medium cursor-pointer">
                I agree to the <span className="text-[#ff9d00]">Terms & Conditions</span> set out by Vaht∞k
              </label>
            </div>
            {errors.agree && (
              <div className="flex items-center space-x-2 mt-2">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-500 font-medium">{errors.agree}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68c00] hover:to-[#ff9d00] text-white py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] mt-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <span>Join Vaht∞k Network</span>
                <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>
        )}
        </div>
      </div>

      {/* Mobile/Tablet Layout - Only hero content */}
      <div className="lg:hidden relative h-full">
        {/* Join Vahtook text and description - Top Right */}
        <div className="absolute top-24 sm:top-28 right-8 text-right space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
            Join <span className="text-[#ff9d00] drop-shadow-lg shadow-black/40" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Vahtook</span>
          </h1>
          <p className="text-xs sm:text-sm text-black leading-snug font-medium" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8)', maxWidth: '8rem'}}>
            Become a trusted logistics partner and start earning with your vehicle.
          </p>
        </div>
      </div>
    </div>

    {/* Mobile Driver Partner Form Section - Separate section below hero */}
    <div className="lg:hidden bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-lg bg-white/98 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/30 mx-auto">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ff9d00]/10 via-[#ff9d00]/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ff9d00]/8 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
          
          {/* Header */}
          <div className="text-center mb-4 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Join <span className="text-[#ff9d00]">Vahtook</span>
            </h1>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Become a trusted logistics partner
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] rounded-full mx-auto mt-2"></div>
          </div>

        {submitted ? (
          <div className="text-center py-4 space-y-3">
            <p className="text-green-600 font-medium text-sm">
              ✓ Registration submitted successfully!
            </p>
            <button
              onClick={handleSecondSubmit}
              className="bg-[#ff9d00] text-white py-2 px-4 rounded-md font-medium hover:bg-[#e68c00] transition-colors text-sm"
            >
              Register Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 max-h-80 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Full Name */}
            <Field 
              label="Full Name" 
              error={errors.fullName}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>}
            >
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter your full name"
              />
            </Field>

            {/* Email */}
            <Field 
              label="Email Address" 
              error={errors.email}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>}
            >
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter your email"
              />
            </Field>

            {/* Phone */}
            <Field 
              label="Phone Number" 
              error={errors.phone}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>}
            >
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter your phone number"
              />
            </Field>

            {/* City */}
            <Field 
              label="City" 
              error={errors.city}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>}
            >
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter your city"
              />
            </Field>

            {/* Vehicle Type */}
            <Field 
              label="Vehicle Type" 
              error={errors.vehicleType}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 9l4-4.5L15 9m4 0h1a1 1 0 011 1v6a1 1 0 01-1 1h-1M7 9H6a1 1 0 00-1 1v6a1 1 0 001 1h1m0-8V6a1 1 0 011-1h4a1 1 0 011 1v3M7 9h8" />
              </svg>}
            >
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm appearance-none bg-white"
              >
                <option value="">Select vehicle type</option>
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            {/* Experience */}
            <Field 
              label="Years of Experience" 
              error={errors.experience}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            >
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter years of experience"
                min="0"
              />
            </Field>

            {/* Service Areas */}
            <Field 
              label="Service Areas" 
              error={errors.serviceAreas}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>}
            >
              <textarea
                name="serviceAreas"
                value={form.serviceAreas}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm resize-none"
                placeholder="List cities/areas you serve"
                rows="2"
              />
            </Field>

            {/* Expected Rate */}
            <Field 
              label="Expected Rate (per trip)" 
              error={errors.expectedRate}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>}
            >
              <input
                type="number"
                name="expectedRate"
                value={form.expectedRate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm"
                placeholder="Enter expected rate"
                min="0"
              />
            </Field>

            {/* Documents */}
            <Field 
              label="Upload Documents" 
              error={errors.documents}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>}
            >
              <input
                type="file"
                name="documents"
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff9d00] focus:border-transparent outline-none transition-all duration-200 text-gray-900 font-medium text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff9d00] file:text-white hover:file:bg-[#e68c00]"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </Field>

            {/* Agreement Checkbox */}
            <Field error={errors.agree}>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-[#ff9d00] border-gray-300 rounded focus:ring-[#ff9d00] focus:ring-2"
                />
                <label className="text-sm text-gray-700 leading-5">
                  I agree to the{" "}
                  <a href="#" className="text-[#ff9d00] font-semibold hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#ff9d00] font-semibold hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </Field>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68c00] hover:to-[#ff9d00] text-white py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] mt-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <span>Join Vaht∞k Network</span>
                <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}
