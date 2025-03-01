import React from "react";
import Footer from "@/components/landing/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: language === "english" ? "Founder & CEO" : "Fundadora y CEO",
      bio:
        language === "english"
          ? "Former language professor with 15 years of experience in education technology."
          : "Ex profesora de idiomas con 15 años de experiencia en tecnología educativa.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio:
        language === "english"
          ? "AI researcher with a background in computational linguistics and natural language processing."
          : "Investigador de IA con experiencia en lingüística computacional y procesamiento del lenguaje natural.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Elena Rodriguez",
      role:
        language === "english"
          ? "Head of Curriculum"
          : "Directora de Currículo",
      bio:
        language === "english"
          ? "Multilingual education specialist with expertise in language acquisition methodologies."
          : "Especialista en educación multilingüe con experiencia en metodologías de adquisición de idiomas.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    {
      name: "David Kim",
      role:
        language === "english"
          ? "Lead AI Engineer"
          : "Ingeniero Principal de IA",
      bio:
        language === "english"
          ? "Speech recognition expert focused on creating natural conversation experiences."
          : "Experto en reconocimiento de voz enfocado en crear experiencias de conversación naturales.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>
      </div>

      {/* Our story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t("about.story.title")}</h2>
          <div className="prose prose-lg">
            <p>
              {language === "english"
                ? "LinguaAI was founded in 2022 with a simple but powerful idea: language learning should be conversational, accessible, and personalized. Our founder, Sarah Johnson, experienced firsthand the challenges of traditional language learning methods during her 15 years as a language professor."
                : "LinguaAI fue fundada en 2022 con una idea simple pero poderosa: el aprendizaje de idiomas debe ser conversacional, accesible y personalizado. Nuestra fundadora, Sarah Johnson, experimentó de primera mano los desafíos de los métodos tradicionales de aprendizaje de idiomas durante sus 15 años como profesora de idiomas."}
            </p>
            <p className="mt-4">
              {language === "english"
                ? "After witnessing countless students struggle with the gap between classroom learning and real-world conversation, Sarah assembled a team of linguists, educators, and AI engineers to create a platform that would make conversation practice available to everyone, anytime."
                : "Después de ver a innumerables estudiantes luchar con la brecha entre el aprendizaje en el aula y la conversación en el mundo real, Sarah reunió un equipo de lingüistas, educadores e ingenieros de IA para crear una plataforma que hiciera que la práctica de conversación estuviera disponible para todos, en cualquier momento."}
            </p>
            <p className="mt-4">
              {language === "english"
                ? "Today, LinguaAI serves thousands of language learners worldwide, helping them build confidence and fluency through natural conversations with AI partners that adapt to their unique learning needs."
                : "Hoy, LinguaAI atiende a miles de estudiantes de idiomas en todo el mundo, ayudándoles a desarrollar confianza y fluidez a través de conversaciones naturales con compañeros de IA que se adaptan a sus necesidades de aprendizaje únicas."}
            </p>
          </div>
        </div>
      </div>

      {/* Our mission */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {t("about.mission.title")}
            </h2>
            <p className="text-xl">
              {language === "english"
                ? "We believe that language learning should be accessible, engaging, and effective for everyone. Our mission is to break down language barriers and connect people across cultures through innovative AI-powered conversation practice."
                : "Creemos que el aprendizaje de idiomas debe ser accesible, atractivo y efectivo para todos. Nuestra misión es derribar las barreras lingüísticas y conectar a las personas a través de las culturas mediante la práctica innovadora de conversación con IA."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">
                  {language === "english" ? "Accessibility" : "Accesibilidad"}
                </h3>
                <p>
                  {language === "english"
                    ? "Making quality language practice available to everyone, regardless of location or schedule."
                    : "Hacer que la práctica de idiomas de calidad esté disponible para todos, independientemente de su ubicación u horario."}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">
                  {language === "english" ? "Innovation" : "Innovación"}
                </h3>
                <p>
                  {language === "english"
                    ? "Leveraging cutting-edge AI technology to create natural, adaptive learning experiences."
                    : "Aprovechando la tecnología de IA de vanguardia para crear experiencias de aprendizaje naturales y adaptativas."}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">
                  {language === "english" ? "Effectiveness" : "Efectividad"}
                </h3>
                <p>
                  {language === "english"
                    ? "Focusing on practical conversation skills that translate to real-world fluency."
                    : "Enfocándonos en habilidades prácticas de conversación que se traducen en fluidez en el mundo real."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t("about.team.title")}
          </h2>
          <p className="text-xl text-center mb-12">
            {t("about.team.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm"
              >
                <Avatar className="h-16 w-16 border-2 border-blue-100">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-blue-600">{member.role}</p>
                  <p className="text-gray-600 mt-1">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
