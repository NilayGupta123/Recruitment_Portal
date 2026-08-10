import Hero from "../../../components/public/Hero";
import LifeSection from "../../../components/public/LifeSection";
import Benefits from "../../../components/public/Benefits";
import JobSection from "../../../components/public/JobSection";
import Footer from "../../../components/public/Footer";

export default function CareerHome() {
  return (
    <div className="bg-[var(--color-canvas)]">
      <Hero />
      <LifeSection />
      <Benefits />
      <JobSection />
      <Footer />
    </div>
  );
}
