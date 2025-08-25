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
    <section 
      className="min-h-screen relative overflow-hidden" 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative min-h-screen flex items-center justify-end pr-16 lg:pr-24">
        <div className="relative z-10 max-w-3xl bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-2xl font-bold text-center mb-1">
          Contact <span className="text-[#ff9d00]">Vaht∞k</span>
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
    </section>
  );
}
