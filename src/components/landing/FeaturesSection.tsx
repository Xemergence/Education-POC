import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MessageCircle,
  Mic,
  Video,
  BookOpen,
  Globe,
  Brain,
  Sparkles,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard = ({ icon, title, description, badge }: FeatureCardProps) => {
  return (
    <Card className="h-full bg-white transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{title}</CardTitle>
              {badge && (
                <Badge variant="secondary" className="text-xs font-normal">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureCardProps[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const FeaturesSection = ({
  title = "Why Learn With Our AI Platform",
  subtitle = "Our platform offers unique features designed to accelerate your language learning journey through immersive AI-powered conversations.",
  features = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "AI Conversation Practice",
      description:
        "Practice real-world conversations with AI partners that adapt to your proficiency level and learning goals.",
      badge: "Popular",
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice Recognition",
      description:
        "Improve your pronunciation with real-time feedback on your speaking, helping you sound more natural and confident.",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Chat Simulation",
      description:
        "Practice non-verbal communication cues in a safe environment with video-enabled AI conversation partners.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Personalized Learning Paths",
      description:
        "Follow customized learning journeys based on your goals, whether for business, travel, academic, or casual conversation.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Cultural Context",
      description:
        "Learn language within authentic cultural contexts, including idioms, customs, and situational appropriateness.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Adaptive Learning",
      description:
        "Our AI remembers your progress and adjusts difficulty automatically, focusing on areas where you need more practice.",
      badge: "New",
    },
  ],
  ctaText = "Start Learning Now",
  onCtaClick = () => console.log("CTA clicked"),
}: FeaturesSectionProps) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full"
          >
            {ctaText}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Join thousands of language learners already improving their skills
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
