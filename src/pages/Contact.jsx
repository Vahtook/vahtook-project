import React, { useState } from "react";
import { Mail, Instagram, Linkedin } from "lucide-react";

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
    <section className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#fefce8] py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-2">
          Contact <span className="text-[#ff9d00]">Vaht∞k</span>
        </h2>
        <p className="text-gray-700 text-center mt-2">
          We'd love to hear from you! Fill out the form or reach us directly through our social links.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-[#ff9d00] focus:border-[#ff9d00]"
              placeholder="Write your message"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#ff9d00] text-white font-semibold shadow-md hover:bg-[#e68a00] transition"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-10 flex justify-center gap-6 text-gray-600">
          <a
            href="https://www.instagram.com/vahtook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Instagram size={20} /> Instagram
          </a>
          <a
            href="info@vahtook.com"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Mail size={20} /> Email
          </a>
          <a
            href="https://www.linkedin.com/company/vahtook/posts/?feedView=all/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
