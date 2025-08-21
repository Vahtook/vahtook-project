import Navbar from "./components/Navbar";
import HeroSection from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DriverPartnerForm from "./pages/DriverPartner";

function App() {
  return (
    <>
      <Navbar />

      {/* Full landing page */}
      <section id="home">
        <HeroSection />
      </section>

      <section id="services">
        <Services />
      </section>




      <section id="contact">
        <Contact
          title="Get in Touch"
          description1="We would like to hear from you!"
          description2="If you have any inquiries or just want to connect, please use the contact form!"
          email="info@vahtook.com"
          instagramUrl="https://instagram.com/yourhandle"
        />
      </section>

      <section id="driver">
        <DriverPartnerForm />
      </section>

      <section id="support">
        <h1 className="p-8 text-3xl font-bold">Support Page</h1>
      </section>
    </>
  );
}

export default App;
