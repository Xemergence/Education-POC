import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DifficultyLevel = "beginner" | "intermediate" | "advanced";
type Language = "english" | "spanish";

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  language: Language;
  imageUrl: string;
  category: string;
}

interface TopicSelectionProps {
  topics?: Topic[];
  selectedLanguage?: Language;
  onSelectTopic?: (topic: Topic) => void;
  onChangeLanguage?: (language: Language) => void;
}

const TopicSelection = ({
  topics = defaultTopics,
  selectedLanguage = "english",
  onSelectTopic = () => {},
  onChangeLanguage = () => {},
}: TopicSelectionProps) => {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const filteredTopics = topics.filter((topic) => {
    if (activeTab === "all") return topic.language === selectedLanguage;
    return topic.category === activeTab && topic.language === selectedLanguage;
  });

  const categories = [...new Set(topics.map((topic) => topic.category))];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Choose a Conversation Topic
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a topic to practice your{" "}
          {selectedLanguage === "english" ? "English" : "Spanish"} conversation
          skills with our AI language partners.
        </p>

        <div className="flex justify-center mt-4 space-x-4">
          <Button
            variant={selectedLanguage === "english" ? "default" : "outline"}
            onClick={() => onChangeLanguage("english")}
            className="min-w-24"
          >
            English
          </Button>
          <Button
            variant={selectedLanguage === "spanish" ? "default" : "outline"}
            onClick={() => onChangeLanguage("spanish")}
            className="min-w-24"
          >
            Spanish
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="all" className="px-4 py-2">
            All Topics
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4 py-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Card
                key={topic.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                onClick={() => onSelectTopic(topic)}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={topic.imageUrl}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{topic.title}</h3>
                    <Badge
                      variant={
                        topic.difficulty === "beginner"
                          ? "default"
                          : topic.difficulty === "intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                      className="ml-2"
                    >
                      {topic.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {topic.description}
                  </p>
                  <Button size="sm" className="w-full">
                    Select Topic
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default mock data
const defaultTopics: Topic[] = [
  {
    id: "1",
    title: "Ordering at a Restaurant",
    description:
      "Practice common phrases and vocabulary for dining out and ordering food.",
    difficulty: "beginner",
    language: "english",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500",
    category: "daily life",
  },
  {
    id: "2",
    title: "Job Interview Preparation",
    description:
      "Prepare for job interviews with common questions and professional vocabulary.",
    difficulty: "intermediate",
    language: "english",
    imageUrl:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=500",
    category: "professional",
  },
  {
    id: "3",
    title: "Making Travel Plans",
    description:
      "Learn how to book accommodations, navigate transportation, and plan itineraries.",
    difficulty: "beginner",
    language: "english",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=500",
    category: "travel",
  },
  {
    id: "4",
    title: "Discussing Current Events",
    description:
      "Develop vocabulary and expressions for discussing news and current affairs.",
    difficulty: "advanced",
    language: "english",
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=500",
    category: "current events",
  },
  {
    id: "5",
    title: "En el Supermercado",
    description:
      "Aprende vocabulario y frases comunes para hacer compras en el supermercado.",
    difficulty: "beginner",
    language: "spanish",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500",
    category: "daily life",
  },
  {
    id: "6",
    title: "Entrevista de Trabajo",
    description:
      "Prepárate para entrevistas laborales con preguntas comunes y vocabulario profesional.",
    difficulty: "intermediate",
    language: "spanish",
    imageUrl:
      "https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=500",
    category: "professional",
  },
];

export default TopicSelection;
