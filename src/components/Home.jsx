import About from "./About";
import BestSellers from "./BestSellers";
import Footer from "./Footer";
import Hero from "./Hero";
import MenuSection from "./MenuSection";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import WhatsAppEnquiry from "./WhatsAppEnquiry";

const Home = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>

    <Navbar />

    <main id="main">
      <Hero />
      <MenuSection />
      <BestSellers />
      <About />
    </main>

    <Footer />
    <WhatsAppEnquiry />
    <ScrollToTop />
  </>
);

export default Home;
