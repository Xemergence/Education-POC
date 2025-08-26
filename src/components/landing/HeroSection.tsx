import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick = () => console.log("CTA clicked"),
}) => {
  const { t } = useLanguage();

  // Use translated text or fallback to props
  const heroTitle = title || t("hero.title");
  const heroSubtitle = subtitle || t("hero.subtitle");
  const heroCta = ctaText || t("hero.cta");
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                  onClick={onCtaClick}
                >
                  {heroCta}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="text-center py-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Sign up to get started
                  </h3>
                  <p className="text-sm text-gray-500">
                    Create an account to start your language learning journey
                  </p>
                </div>
                {/* Auth form would be rendered here */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Already have an account? Sign in
                </p>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
            >
              {t("hero.howitworks")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10 rounded-2xl"></div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt="People having a conversation with AI avatars"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 p-4 z-20">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
                  alt="AI Avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-medium text-gray-900">Sofia</p>
                  <p className="text-xs text-gray-500">AI Language Partner</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "Hi! Ready to practice your English? Let's start with numbers 1–10 and build confidence together."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">2M+</p>
            <p className="text-sm text-gray-600">Active Learners</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">50+</p>
            <p className="text-sm text-gray-600">AI Conversation Partners</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">92%</p>
            <p className="text-sm text-gray-600">Fluency Improvement</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p className="text-sm text-gray-600">Practice Availability</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;