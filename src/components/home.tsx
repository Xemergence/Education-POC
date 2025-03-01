import React, { useState } from "react";
import { motion } from "framer-motion";

// Import components
import HeroSection from "./landing/HeroSection";
import TestimonialSection from "./landing/TestimonialSection";
import FeaturesSection from "./landing/FeaturesSection";
import Footer from "./landing/Footer";
import AuthModal from "./auth/AuthModal";
import OnboardingModal from "./onboarding/OnboardingModal";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">(
    "signin",
  );
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignInClick = () => {
    setAuthModalTab("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (data: any) => {
    setIsAuthenticated(true);
    setUserName(data.email?.split("@")[0] || "User");

    // If user just signed up, show onboarding
    if (authModalTab === "signup") {
      setIsOnboardingOpen(true);
    }
  };

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed with data:", userData);
    setIsOnboardingOpen(false);
  };

  const handleCtaClick = () => {
    if (!isAuthenticated) {
      handleSignUpClick();
    } else {
      // Navigate to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero section */}
        <HeroSection
          onCtaClick={handleCtaClick}
          title="Master Languages Through AI Conversation"
          subtitle="Practice speaking English and Spanish with our AI conversation partners. Get real-time feedback and improve your fluency in a safe, judgment-free environment."
          ctaText={
            isAuthenticated ? "Continue Learning" : "Start Learning for Free"
          }
        />

        {/* Features section */}
        <FeaturesSection
          onCtaClick={handleCtaClick}
          ctaText={
            isAuthenticated ? "Continue Your Journey" : "Start Learning Now"
          }
        />

        {/* Testimonials section */}
        <TestimonialSection />

        {/* Footer */}
        <Footer companyName="LinguaAI" logoSrc="/vite.svg" />
      </motion.div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authModalTab}
        onSignInSuccess={handleAuthSuccess}
        onSignUpSuccess={handleAuthSuccess}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Home;
