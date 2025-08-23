import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#ff9d00]">
            Vahtook
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Smart logistics solutions for businesses and individuals.
            Reliable, affordable, and built for growth.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold text-white">Pages</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Partners
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white">Support</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-slate-700 pt-6 flex flex-col items-center text-sm px-6 max-w-7xl mx-auto">
        {/* Centered links */}
        <div className="flex flex-wrap justify-center gap-4 mb-3 text-center">
          <a
            href="https://www.linkedin.com/company/vahtook/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Linkedin size={20} /> LinkedIn
          </a>

          <a
            href="https://x.com/vahtook"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Twitter size={20} /> X
          </a>

          <a
            href="https://www.instagram.com/vahtook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Instagram size={20} /> Instagram
          </a>

          <a
            href="mailto:info@vahtook.com"
            className="flex items-center gap-2 hover:text-[#ff9d00] transition"
          >
            <Mail size={20} /> Email
          </a>

          <a href="#" className="hover:text-[#ff9d00] transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#ff9d00] transition">
            Terms
          </a>
        </div>

        {/* Rights reserved */}
        <p className="text-slate-400 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Vaht∞k</span>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
