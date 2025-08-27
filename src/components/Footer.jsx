import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/new-vahtook-logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16 relative">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <img 
             src={logo}
             alt="Vahtook logo"
             className="h-19 w-auto mx-auto md:mx-0"
         />
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Smart logistics solutions for businesses and individuals. Reliable,
            affordable, and built for growth.
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
              <Link to="/career" className="hover:text-[#ff9d00] transition">
                Careers
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff9d00] transition">
                Terms of service
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
        {/* Social Media Links */}
        <StyledWrapper>
          <div id="SocailIcons">
            {/* Instagram */}
            <div className="icons instaIcon">
              <p className="iconName">Instagram</p>
              <a
                href="https://www.instagram.com/vahtook/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon insta"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    fillRule="evenodd"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="icons linkedin">
              <p className="iconName">LinkedIn</p>
              <a
                href="https://www.linkedin.com/company/vahtook/posts/?feedView=all/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="4.983" cy="5.009" r="2.188" />
                  <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
                </svg>
              </a>
            </div>

            {/* Twitter (X) */}
            <a
              href="https://x.com/vahtook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icons X">
                <p className="iconName">X</p>
                <div className="icon x">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2H21.5l-7.52 8.58L22 22h-7.295l-5.73-7.21L3.77 22H.5l7.977-9.1L2 2h7.295l5.23 6.58L18.244 2zM16.73 20h2.02L7.34 4H5.2l11.53 16z" />
                  </svg>
                </div>
              </div>
            </a>

            {/* YouTube */}
            <div className="icons youtube">
              <p className="iconName">YouTube</p>
              <a
                href="https://youtube.com/@vahtook?si=L9o9cWq4sUJUr4Ll"
                target="_blank"
                rel="noopener noreferrer"
                className="icon tube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                </svg>
              </a>
            </div>
          </div>
        </StyledWrapper>

        {/* Rights reserved */}
        <p className="text-slate-400 text-center mt-6">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Vahtook</span>. All Rights
          Reserved.
        </p>

        {/* ✅ Added Contact Info below copyright */}
        <div className="mt-4 text-slate-400 text-center text-sm space-y-0">
          <p> Address: B-10 Kedar Galaxy, Shramik Nagar, Nashik. 422012</p>
          <p> Email: info@vahtook.com</p>
          <p> Phone: 7777810196</p>
          
        </div>
      </div>
    </footer>
  );
}

const StyledWrapper = styled.div`
  #SocailIcons {
    min-width: 350px;
    display: flex;
    justify-content: center;   
    gap: 20px;                
    margin-top: 20px;
  }

  .icons {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .icons svg {
    width: 60%;
    height: 60%;
    z-index: 2; 
  }

  .iconName {
    position: absolute;
    top: -40px;
    font-size: 12px;
    color: #fff;
    transform: scale(0);
    border-radius: 3px;
    padding: 3px;
    transition: transform 0.3s ease;
    white-space: nowrap;
    z-index: 3;
  }

  .icons:hover .iconName {
    transform: scale(1);
  }

  /* Tooltip background colors */
  .icons.instaIcon:hover .iconName {
    background: linear-gradient(30deg, #0000ff, #f56040);
  }
  .icons.linkedin:hover .iconName {
    background: #0274b3;
  }
  .icons.whatsapp:hover .iconName {
    background: #25d366;
  }
  .icons.youtube:hover .iconName {
    background: #ff0000;
  }

  .icon.x::before {
    background: #000;
  }

  .icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: #0c0c0c;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #fff; 
    z-index: 1;
  }

  .icon:hover {
    color: #fff;
    box-shadow: 5px 5px 10px #181717ce;
  }

  .icon::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    border-radius: 50%;
    transition: height 0.3s ease;
    z-index: 0;
  }

  .icon:hover::before {
    height: 100%;
  }

  .icon.tube::before {
    background: red;
  }
  .icon.insta::before {
    background: linear-gradient(40deg, #0000ff, #f56040);
  }
  .icon.link::before {
    background: #0274b3;
  }
  .icon.whats::before {
    background: #25d366;
  }
`;

