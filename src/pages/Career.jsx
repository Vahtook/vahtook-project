import { useState } from "react";

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for applying to Vahtook! We’ll review your details.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border-t-4" style={{ borderColor: "#ff9d00" }}>
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#ff9d00" }}>
          Careers at Vahtook
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join our logistics revolution! Please provide your details below and upload your resume.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#ff9d00", focusRingColor: "#ff9d00" }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#ff9d00" }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#ff9d00" }}
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Qualification</label>
            <input
              type="text"
              name="qualification"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#ff9d00" }}
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Upload Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-semibold py-2 px-4 rounded-lg text-white"
            style={{ backgroundColor: "#ff9d00" }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
