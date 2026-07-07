/**
 * LandingPage.jsx — Page Orchestrator
 *
 * WHY THIS FILE STAYS MINIMAL:
 * LandingPage.jsx is NOT a component — it is a COMPOSITION ROOT.
 * Its only job is to import sections and declare their order.
 * Zero styling, zero data, zero logic lives here.
 *
 * This is the "director" pattern used at Linear, Vercel, and Stripe:
 * the page file reads like a table of contents for your sections.
 *
 * When a designer says "move Testimonials above Workflow", you change
 * TWO lines here — nothing inside any component ever needs to change.
 *
 * REACT CONCEPT: Composition over configuration.
 * We compose complex pages from small, self-contained pieces.
 * This is the core philosophy of React itself.
 */

import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import WorkflowSection from '../../components/landing/WorkflowSection';
import EnvironmentSection from '../../components/landing/EnvironmentSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import CTASection from '../../components/landing/CTASection';
import Footer from '../../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <EnvironmentSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
