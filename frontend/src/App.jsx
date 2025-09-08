

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Career from "./pages/Career";
import Home from "./pages/Home";
import DriverPartnerForm from "./pages/DriverPartner";
import Contact from "./pages/Contact";
import BusinessPartner from "./pages/BuisnessPartner";
import WhatsAppButton from "./components/WhatsAppButton";


function App() {
  return (
    <>
     
      <Navbar />

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver-partner" element={<DriverPartnerForm />} />
        <Route path="/support" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/business-partner" element={<BusinessPartner />} /> 
        
      </Routes>

      {/* Global Footer */}
      <Footer />
        <WhatsAppButton />
    </>
  );
}

export default App;
