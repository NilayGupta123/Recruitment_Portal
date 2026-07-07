import Navbar from "../../../components/public/Navbar";
import Hero from "../../../components/public/Hero";
import LifeSection from "../../../components/public/LifeSection";
import Benefits from "../../../components/public/Benefits";
import JobSection from "../../../components/public/JobSection";
import Footer from "../../../components/public/Footer";

export default function CareerHome() {
  return (
    <div className="bg-slate-50">

      <Navbar />

      <Hero />

      <LifeSection />

      <Benefits />

      <JobSection />

      <Footer />

    </div>
  );
}