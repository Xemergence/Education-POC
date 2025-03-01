import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/landing/HeroSection";
import AIConversationFeature from "../components/landing/AIConversationFeature";
import AuthenticationSection from "../components/landing/AuthenticationSection";
import TestimonialSection from "../components/landing/TestimonialSection";
import Footer from "../components/landing/Footer";

const Landing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"sign-in" | "sign-up">("sign-in");

  const handleSignInClick = () => {
    setAuthTab("sign-in");
    setShowAuthModal(true);
    // Scroll to authentication section
    document
      .getElementById("auth-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignUpClick = () => {
    setAuthTab("sign-up");
    setShowAuthModal(true);
    // Scroll to authentication section
    document
      .getElementById("auth-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaClick = () => {
    setAuthTab("sign-up");
    setShowAuthModal(true);
    // Scroll to authentication section
    document
      .getElementById("auth-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onCtaClick={handleCtaClick} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AIConversationFeature onCtaClick={handleCtaClick} />
      </motion.div>

      <motion.div
        id="auth-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AuthenticationSection
          defaultTab={authTab}
          onSignIn={(data) => console.log("Sign in", data)}
          onSignUp={(data) => console.log("Sign up", data)}
          onSocialLogin={(provider) =>
            console.log(`Social login with ${provider}`)
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TestimonialSection />
      </motion.div>

      <Footer companyName="LinguaAI" />
    </div>
  );
};

export default Landing;
