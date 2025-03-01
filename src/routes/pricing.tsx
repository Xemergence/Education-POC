import React from "react";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingTier = ({
  name,
  price,
  features,
  isPopular = false,
  buttonText = "Get Started",
}) => (
  <div
    className={`bg-white rounded-lg shadow-lg overflow-hidden ${isPopular ? "ring-2 ring-blue-500" : ""}`}
  >
    {isPopular && (
      <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
        Most Popular
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-500">/month</span>
      </div>
      <Button
        className={`w-full ${isPopular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
      >
        {buttonText}
      </Button>
    </div>
    <div className="border-t border-gray-100 p-6">
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Pricing = () => {
  const { t, language } = useLanguage();
  const pricingTiers = [
    {
      name: language === "english" ? "Basic" : "Básico",
      price: 9.99,
      features:
        language === "english"
          ? [
              "Access to basic AI conversation practice",
              "5 hours of practice per month",
              "Basic vocabulary and grammar exercises",
              "Email support",
            ]
          : [
              "Acceso a práctica básica de conversación con IA",
              "5 horas de práctica al mes",
              "Ejercicios básicos de vocabulario y gramática",
              "Soporte por correo electrónico",
            ],
      isPopular: false,
      buttonText: t("pricing.startfreetrial"),
    },
    {
      name: language === "english" ? "Premium" : "Premium",
      price: 19.99,
      features:
        language === "english"
          ? [
              "Unlimited AI conversation practice",
              "Advanced vocabulary and grammar exercises",
              "Progress tracking and analytics",
              "Personalized learning path",
              "Priority email support",
              "Access to all language topics",
            ]
          : [
              "Práctica ilimitada de conversación con IA",
              "Ejercicios avanzados de vocabulario y gramática",
              "Seguimiento de progreso y análisis",
              "Ruta de aprendizaje personalizada",
              "Soporte prioritario por correo electrónico",
              "Acceso a todos los temas de idiomas",
            ],
      isPopular: true,
      buttonText: t("pricing.startfreetrial"),
    },
    {
      name: language === "english" ? "Professional" : "Profesional",
      price: 39.99,
      features:
        language === "english"
          ? [
              "Everything in Premium",
              "1-on-1 sessions with human tutors",
              "Business and specialized vocabulary",
              "Custom learning materials",
              "24/7 priority support",
              "Team management features",
            ]
          : [
              "Todo lo incluido en Premium",
              "Sesiones 1 a 1 con tutores humanos",
              "Vocabulario empresarial y especializado",
              "Materiales de aprendizaje personalizados",
              "Soporte prioritario 24/7",
              "Funciones de gestión de equipos",
            ],
      isPopular: false,
      buttonText: t("pricing.contactsales"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-12 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("pricing.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t("pricing.subtitle")}
          </p>

          <div className="inline-flex items-center bg-white p-1 rounded-full border border-gray-200 mb-8">
            <button className="px-4 py-2 rounded-full bg-blue-500 text-white font-medium">
              {t("pricing.monthly")}
            </button>
            <button className="px-4 py-2 rounded-full text-gray-700 font-medium">
              {t("pricing.annual")}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("pricing.faq.title")}</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">
                {language === "english"
                  ? "Can I change plans later?"
                  : "¿Puedo cambiar de plan más adelante?"}
              </h3>
              <p className="text-gray-600">
                {language === "english"
                  ? "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle."
                  : "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación."}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">
                {language === "english"
                  ? "Is there a free trial?"
                  : "¿Hay una prueba gratuita?"}
              </h3>
              <p className="text-gray-600">
                {language === "english"
                  ? "Yes, all plans come with a 7-day free trial so you can experience our platform before committing."
                  : "Sí, todos los planes vienen con una prueba gratuita de 7 días para que puedas experimentar nuestra plataforma antes de comprometerte."}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">
                {language === "english"
                  ? "What payment methods do you accept?"
                  : "¿Qué métodos de pago aceptan?"}
              </h3>
              <p className="text-gray-600">
                {language === "english"
                  ? "We accept all major credit cards, PayPal, and Apple Pay."
                  : "Aceptamos todas las principales tarjetas de crédito, PayPal y Apple Pay."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
