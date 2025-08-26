import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type Language = "english";

type Translations = {
  [key: string]: {
    english: string;
    spanish: string;
  };
};

const translations: Translations = {
  // Navbar
  "nav.features": {
    english: "Features",
    spanish: "Características",
  },
  "nav.pricing": {
    english: "Pricing",
    spanish: "Precios",
  },
  "nav.about": {
    english: "About",
    spanish: "Nosotros",
  },
  "nav.dashboard": {
    english: "Dashboard",
    spanish: "Panel",
  },
  "nav.courses": {
    english: "Courses",
    spanish: "Cursos",
  },
  "nav.signin": {
    english: "Sign In",
    spanish: "Iniciar Sesión",
  },
  "nav.signup": {
    english: "Sign Up",
    spanish: "Registrarse",
  },
  "nav.myaccount": {
    english: "My Account",
    spanish: "Mi Cuenta",
  },
  "nav.signout": {
    english: "Sign Out",
    spanish: "Cerrar Sesión",
  },

  // Hero Section
  "hero.title": {
    english: "Master Languages Through AI Conversation",
    spanish: "Domina Idiomas a Través de Conversaciones con IA",
  },
  "hero.subtitle": {
    english:
      "Practice speaking English and Spanish with our AI conversation partners. Get real-time feedback and improve your fluency in a safe, judgment-free environment.",
    spanish:
      "Practica inglés y español con nuestros compañeros de conversación IA. Recibe retroalimentación en tiempo real y mejora tu fluidez en un entorno seguro y sin juicios.",
  },
  "hero.cta": {
    english: "Start Learning for Free",
    spanish: "Comienza a Aprender Gratis",
  },
  "hero.continue": {
    english: "Continue Learning",
    spanish: "Continuar Aprendiendo",
  },
  "hero.howitworks": {
    english: "How It Works",
    spanish: "Cómo Funciona",
  },

  // Features Section
  "features.title": {
    english: "Why Learn With Our AI Platform",
    spanish: "Por Qué Aprender Con Nuestra Plataforma de IA",
  },
  "features.subtitle": {
    english:
      "Our platform offers unique features designed to accelerate your language learning journey through immersive AI-powered conversations.",
    spanish:
      "Nuestra plataforma ofrece características únicas diseñadas para acelerar tu aprendizaje de idiomas a través de conversaciones inmersivas con IA.",
  },
  "features.cta": {
    english: "Start Learning Now",
    spanish: "Comienza a Aprender Ahora",
  },
  "features.continue": {
    english: "Continue Your Journey",
    spanish: "Continúa Tu Aprendizaje",
  },
  "features.popular": {
    english: "Popular",
    spanish: "Popular",
  },
  "features.new": {
    english: "New",
    spanish: "Nuevo",
  },

  // AI Conversation Feature
  "aifeature.title": {
    english: "Practice Conversations with AI Language Partners",
    spanish: "Practica Conversaciones con Compañeros de IA",
  },
  "aifeature.description": {
    english:
      "Improve your language skills by having natural conversations with our AI avatars. Choose from various topics and difficulty levels to enhance your fluency in English and Spanish.",
    spanish:
      "Mejora tus habilidades lingüísticas manteniendo conversaciones naturales con nuestros avatares de IA. Elige entre varios temas y niveles de dificultad para mejorar tu fluidez en inglés y español.",
  },
  "aifeature.cta": {
    english: "Start Practicing Now",
    spanish: "Comienza a Practicar Ahora",
  },

  // Authentication Section
  "auth.title": {
    english: "Join Our Language Learning Community",
    spanish: "Únete a Nuestra Comunidad de Aprendizaje de Idiomas",
  },
  "auth.description": {
    english:
      "Create an account to start practicing conversations with our AI language partners or sign in to continue your learning journey.",
    spanish:
      "Crea una cuenta para comenzar a practicar conversaciones con nuestros compañeros de IA o inicia sesión para continuar tu aprendizaje.",
  },
  "auth.signin": {
    english: "Sign In",
    spanish: "Iniciar Sesión",
  },
  "auth.signup": {
    english: "Sign Up",
    spanish: "Registrarse",
  },
  "auth.continue": {
    english: "Continue with",
    spanish: "Continuar con",
  },
  "auth.or": {
    english: "or",
    spanish: "o",
  },
  "auth.email": {
    english: "Email",
    spanish: "Correo electrónico",
  },
  "auth.password": {
    english: "Password",
    spanish: "Contraseña",
  },
  "auth.confirmpassword": {
    english: "Confirm Password",
    spanish: "Confirmar Contraseña",
  },
  "auth.forgotpassword": {
    english: "Forgot password?",
    spanish: "¿Olvidaste tu contraseña?",
  },
  "auth.rememberme": {
    english: "Remember me",
    spanish: "Recordarme",
  },
  "auth.alreadyhaveaccount": {
    english: "Already have an account?",
    spanish: "¿Ya tienes una cuenta?",
  },
  "auth.donthaveaccount": {
    english: "Don't have an account?",
    spanish: "¿No tienes una cuenta?",
  },
  "auth.termsandprivacy": {
    english:
      "By continuing, you agree to our Terms of Service and Privacy Policy",
    spanish:
      "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad",
  },
  "auth.termsofservice": {
    english: "Terms of Service",
    spanish: "Términos de Servicio",
  },
  "auth.privacypolicy": {
    english: "Privacy Policy",
    spanish: "Política de Privacidad",
  },

  // Testimonials Section
  "testimonials.title": {
    english: "Success Stories from Our Students",
    spanish: "Historias de Éxito de Nuestros Estudiantes",
  },
  "testimonials.subtitle": {
    english:
      "See how our AI conversation practice has helped language learners achieve their goals",
    spanish:
      "Mira cómo nuestra práctica de conversación con IA ha ayudado a los estudiantes a alcanzar sus metas",
  },
  "testimonials.cta": {
    english: "Start Your Free Trial",
    spanish: "Comienza Tu Prueba Gratuita",
  },
  "testimonials.join": {
    english:
      "Join thousands of satisfied learners who have improved their language skills",
    spanish:
      "Únete a miles de estudiantes satisfechos que han mejorado sus habilidades lingüísticas",
  },

  // Footer
  "footer.subscribe": {
    english: "Subscribe to our newsletter",
    spanish: "Suscríbete a nuestro boletín",
  },
  "footer.subscribedesc": {
    english: "Get the latest news and updates about our platform.",
    spanish:
      "Recibe las últimas noticias y actualizaciones sobre nuestra plataforma.",
  },
  "footer.enteremail": {
    english: "Enter your email",
    spanish: "Ingresa tu correo electrónico",
  },
  "footer.subscribebutton": {
    english: "Subscribe",
    spanish: "Suscribirse",
  },
  "footer.allrightsreserved": {
    english: "All rights reserved.",
    spanish: "Todos los derechos reservados.",
  },
  "footer.privacy": {
    english: "Privacy",
    spanish: "Privacidad",
  },
  "footer.terms": {
    english: "Terms",
    spanish: "Términos",
  },
  "footer.cookies": {
    english: "Cookies",
    spanish: "Cookies",
  },
  "footer.contact": {
    english: "Contact",
    spanish: "Contacto",
  },

  // About Page
  "about.title": {
    english: "About LinguaAI",
    spanish: "Sobre LinguaAI",
  },
  "about.subtitle": {
    english:
      "We're on a mission to revolutionize language learning through AI-powered conversation practice",
    spanish:
      "Nuestra misión es revolucionar el aprendizaje de idiomas a través de la práctica de conversación con IA",
  },
  "about.story.title": {
    english: "Our Story",
    spanish: "Nuestra Historia",
  },
  "about.mission.title": {
    english: "Our Mission",
    spanish: "Nuestra Misión",
  },
  "about.team.title": {
    english: "Meet Our Team",
    spanish: "Conoce a Nuestro Equipo",
  },
  "about.team.subtitle": {
    english: "The passionate people behind LinguaAI",
    spanish: "Las personas apasionadas detrás de LinguaAI",
  },

  // Pricing Page
  "pricing.title": {
    english: "Simple, Transparent Pricing",
    spanish: "Precios Simples y Transparentes",
  },
  "pricing.subtitle": {
    english: "Choose the plan that's right for your language learning journey",
    spanish: "Elige el plan adecuado para tu aprendizaje de idiomas",
  },
  "pricing.monthly": {
    english: "Monthly",
    spanish: "Mensual",
  },
  "pricing.annual": {
    english: "Annual (Save 20%)",
    spanish: "Anual (Ahorra 20%)",
  },
  "pricing.faq.title": {
    english: "Frequently Asked Questions",
    spanish: "Preguntas Frecuentes",
  },
  "pricing.getstarted": {
    english: "Get Started",
    spanish: "Comenzar",
  },
  "pricing.startfreetrial": {
    english: "Start Free Trial",
    spanish: "Iniciar Prueba Gratuita",
  },
  "pricing.contactsales": {
    english: "Contact Sales",
    spanish: "Contactar a Ventas",
  },

  // Features Page
  "featurespage.title": {
    english: "Platform Features",
    spanish: "Características de la Plataforma",
  },
  "featurespage.subtitle": {
    english:
      "Discover all the powerful features that make our language learning platform unique",
    spanish:
      "Descubre todas las potentes características que hacen única a nuestra plataforma de aprendizaje de idiomas",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useLocalStorage<Language>(
    "language",
    "english",
  );

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
