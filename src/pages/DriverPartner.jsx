import React, { useState } from "react";

// Field Component
function Field({ label, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#fefce8] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#ff9d00] mb-2">
          Vaht∞k Driver Partner Registration
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Join Vaht∞k and grow your logistics business with us!
        </p>

        {submitted ? (
          <div className="text-center py-6">
            <p className="text-green-600 font-medium">
              🎉 Thank you! Your registration has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <Field label="Full Name" error={errors.fullName}>
              <input
                id="full-name"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="Enter your full name"
              />
            </Field>

            {/* Email */}
            <Field label="Email" error={errors.email}>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="your@email.com"
              />
            </Field>

            {/* Phone */}
            <Field label="Phone Number" error={errors.phone}>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="10-digit mobile number"
              />
            </Field>

            {/* City */}
            <Field label="City" error={errors.city}>
              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="Enter your city"
              />
            </Field>

            {/* Vehicle Type */}
            <Field label="Vehicle Type" error={errors.vehicleType}>
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
              >
                <option value="">Select vehicle</option>
                {vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>

            {/* Experience */}
            <Field label="Experience (years)" error={errors.experience}>
              <input
                id="experience"
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="e.g. 2"
              />
            </Field>

            {/* Service Areas */}
            <Field label="Service Areas (optional)" error={errors.serviceAreas}>
              <textarea
                id="serviceAreas"
                name="serviceAreas"
                value={form.serviceAreas}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
                placeholder="List areas you serve"
              />
            </Field>

            {/* File Upload */}
            <Field label="Upload Documents (optional)" error={errors.documents}>
              <input
                id="documents"
                type="file"
                name="documents"
                onChange={handleChange}
                className="w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-[#ff9d00] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#e68c00]"
              />
            </Field>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2">
              <input
                id="agree"
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#ff9d00] focus:ring-[#ff9d00]"
              />
              <label htmlFor="agree" className="text-sm text-slate-700">
                I agree to the terms & conditions
              </label>
            </div>
            {errors.agree && (
              <p className="text-xs text-rose-600">{errors.agree}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ff9d00] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#e68c00] transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
