import React, { useState } from "react";
import bgImage from "../assets/vahtook-driverpartner.png";

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
      documents: null,
      agree: false,
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#fefce8] flex items-center justify-center py-12 px-6" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
           <span className="text-[#ff9d00]">Vaht∞k</span>{" "}
           <span className="text-black">Driver Partner Registration</span>
         </h1>
        <p className="text-center text-slate-700 mb-6">
          Join Vaht∞k and grow your logistics business with us!
        </p>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <p className="text-green-700 font-medium">
              🎉 Thank you! Your registration has been submitted successfully.
            </p>

            {/* Second Submit Button */}
            <button
              onClick={handleSecondSubmit}
              className="bg-[#ff9d00] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#e68c00] transition"
            >
              Submit Again
            </button>
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
            {/* Expected Rate */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Expected Rate (per trip/day)
  </label>
  <input
    type="text"
    name="expectedRate"
    value={form.expectedRate}
    onChange={handleChange}
    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#ff9d00] focus:ring-[#ff9d00]"
    placeholder="e.g., ₹500 per day or ₹100 per trip"
    required
  />
</div>


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
            <div className="border rounded-lg p-4 max-h-48 overflow-y-scroll text-sm text-slate-700 bg-slate-50">
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
                I agree to the Terms & Conditions set out by Vaht∞k
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
