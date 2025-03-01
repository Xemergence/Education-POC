import React from "react";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AIConversationFeature from "@/components/landing/AIConversationFeature";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <div className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t("featurespage.title")}
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            {t("featurespage.subtitle")}
          </p>
        </div>
      </div>

      <FeaturesSection />
      <AIConversationFeature />

      <Footer />
    </div>
  );
};

export default Features;
