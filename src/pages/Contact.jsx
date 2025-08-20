//pages/Contact.jsx
import React from "react";

const Contact = ({ title, description1, description2, email, instagramUrl }) => {
  return (
    <div className="min-h-screen bg-[#f5eee6] flex items-center justify-center">
      <div className="max-w-6xl w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#8a4a2f]">{title}</h1>
          <p className="mt-4 text-[#444444]">{description1}</p>
          <p className="mt-2 text-[#444444]">{description2}</p>

          <div className="mt-8 space-y-2">
            <a href={`mailto:${email}`} className="text-[#444444] underline">
              {email}
            </a>
            <div>
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-1/2">
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-400 px-3 py-2"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Mobile</label>
              <input
                type="mobile"
                className="w-full border border-gray-400 px-3 py-2"
                placeholder="Mobile"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-400 px-3 py-2"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full border border-gray-400 px-3 py-2"
                placeholder="Message"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#8a4a2f] text-white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
