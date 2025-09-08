import React, { useState } from "react";
import { Mail, Instagram, Linkedin } from "lucide-react";
import bgImage from "../assets/contact-2.jpg";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", form);
    alert("Your message has been sent succecfully");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
    <section 
      className="relative h-[60vh] sm:h-[70vh] lg:min-h-screen contact-background overflow-hidden w-full" 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
      }}
    >
      {/* Desktop Layout - Form overlay on image */}
      <div className="hidden lg:flex min-h-screen items-center justify-end pr-16 lg:pr-24">
        <div className="relative z-10 max-w-3xl bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-2xl font-bold text-center mb-1">
          Contact <span className="text-[#ff9d00]">Vahtook</span>
        </h2>
        <p className="text-gray-600 text-center text-sm">
          We'd love to hear from you!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder-gray-400 resize-none"
              placeholder="Write your message"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68c00] hover:to-[#ff9d00] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-4 text-gray-600">
          <a
            href="https://www.instagram.com/vahtook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
          >
            <Instagram size={16} /> Instagram
          </a>
          <a
            href="info@vahtook.com"
            className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
          >
            <Mail size={16} /> Email
          </a>
          <a
            href="https://www.linkedin.com/company/vahtook/posts/?feedView=all/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
      </div>

      {/* Mobile/Tablet Layout - Only hero content */}
      <div className="lg:hidden relative h-full">
        {/* Contact heading - Top Center */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg px-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
            Contact <span className="text-[#ff9d00] drop-shadow-lg shadow-black/40" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Vahtook</span>
          </h1>
        </div>
      </div>
    </section>

    {/* Mobile Contact Form Section - Separate section below hero */}
    <div className="lg:hidden bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4">
        <div className="w-full bg-white/98 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/30">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ff9d00]/10 via-[#ff9d00]/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ff9d00]/8 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
          
          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Contact <span className="text-[#ff9d00]">Vahtook</span>
            </h2>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              We'd love to hear from you!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] rounded-full mx-auto mt-2"></div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-[#ff9d00] focus:ring-2 focus:ring-[#ff9d00]/20 focus:outline-none transition-all duration-200 resize-none"
                placeholder="Write your message"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff9d00] to-[#ffb84d] hover:from-[#e68c00] hover:to-[#ff9d00] text-white py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-6 flex justify-center gap-4 text-gray-600 relative z-10">
            <a
              href="https://www.instagram.com/vahtook/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
            >
              <Instagram size={16} /> Instagram
            </a>
            <a
              href="info@vahtook.com"
              className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
            >
              <Mail size={16} /> Email
            </a>
            <a
              href="https://www.linkedin.com/company/vahtook/posts/?feedView=all/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#ff9d00] transition text-sm"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
