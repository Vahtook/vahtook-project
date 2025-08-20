import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverPartnerForm from "./pages/DriverPartner";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/Home";

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
      </Routes>
    </Router>
  );
}

export default App;
