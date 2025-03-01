import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mic, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AIConversationFeatureProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const AIConversationFeature = ({
  title = "Practice Conversations with AI Language Partners",
  description = "Improve your language skills by having natural conversations with our AI avatars. Choose from various topics and difficulty levels to enhance your fluency in English and Spanish.",
  ctaText = "Start Practicing Now",
  onCtaClick = () => console.log("CTA clicked"),
  features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title: "Natural Conversations",
      description:
        "Engage in realistic dialogues that adapt to your responses and speaking style.",
    },
    {
      icon: <Mic className="h-8 w-8 text-purple-500" />,
      title: "Voice Recognition",
      description:
        "Practice speaking and receive instant feedback on pronunciation and fluency.",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Multiple Languages",
      description:
        "Practice in English and Spanish with native-sounding AI conversation partners.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      title: "Personalized Learning",
      description:
        "AI adapts to your skill level and focuses on areas where you need improvement.",
    },
  ],
}: AIConversationFeatureProps) => {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="text-lg text-slate-600">{description}</p>

            <Button
              size="lg"
              onClick={onCtaClick}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              {ctaText}
            </Button>
          </motion.div>

          {/* Right side - AI Avatar visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="AI Conversation Partner"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6 text-white">
                  <p className="text-xl font-medium">
                    Meet Your AI Language Partners
                  </p>
                  <p className="text-sm opacity-90">
                    Realistic conversations to improve your skills
                  </p>
                </div>
              </div>

              {/* Chat bubbles overlay to simulate conversation */}
              <div className="absolute top-1/4 left-4 bg-white p-3 rounded-lg rounded-bl-none shadow-md max-w-[40%]">
                <p className="text-sm">¿Cómo estuvo tu fin de semana?</p>
              </div>
              <div className="absolute top-1/2 right-4 bg-blue-500 p-3 rounded-lg rounded-br-none shadow-md max-w-[40%]">
                <p className="text-sm text-white">
                  It was great! I visited a museum.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-slate-100">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIConversationFeature;
