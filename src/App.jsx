
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DriverPartnerForm from "./pages/DriverPartner";
import Contact from "./pages/Contact";
import BusinessPartner from "./pages/BuisnessPartner";


function App() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Route-based Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver-partner" element={<DriverPartnerForm />} />
        <Route path="/support" element={<Contact />} />
        
        <Route path="/business-partner" element={<BusinessPartner />} /> 
        {/* Temporary — replace with actual page later */}
      </Routes>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

export default App;
