import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/Home";

import DriverPartnerForm from "./pages/DriverPartner";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import WhyChooseUs from "./pages/WhyChooseUs";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<h1 className="p-8 text-3xl font-bold">Home Page</h1>}
        />
        <Route path="/driver-partner" element={<DriverPartnerForm />} />
        <Route
          path="/support"
          element={<h1 className="p-8 text-3xl font-bold">Support Page</h1>}
        />

        
        <Route
          path="/contact"
          element={
            <Contact
              title="Get in Touch"
              description1="We would like to hear from you!"
              description2="If you have any inquiries or just want to connect, please use the contact form!"
              email="info@vahtook.com"
              instagramUrl="https://instagram.com/yourhandle"
            />
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
      </Routes>
    </Router>
  );
}

export default App;
