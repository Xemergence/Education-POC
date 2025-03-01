import React from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIAvatar {
  id: string;
  name: string;
  image: string;
  description: string;
  language: "english" | "spanish";
  level: "beginner" | "intermediate" | "advanced";
  personality: string;
}

interface AIAvatarSelectionProps {
  avatars?: AIAvatar[];
  selectedAvatarId?: string;
  onSelect?: (avatarId: string) => void;
  language?: "english" | "spanish";
}

const AIAvatarSelection = ({
  avatars = [
    {
      id: "1",
      name: "Sofia",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      description:
        "Friendly Spanish teacher who specializes in everyday conversation",
      language: "spanish",
      level: "beginner",
      personality: "Patient and encouraging",
    },
    {
      id: "2",
      name: "Carlos",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      description:
        "Business Spanish expert who helps with professional vocabulary",
      language: "spanish",
      level: "intermediate",
      personality: "Professional and direct",
    },
    {
      id: "3",
      name: "Emma",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      description:
        "English conversation partner focused on American slang and idioms",
      language: "english",
      level: "intermediate",
      personality: "Casual and humorous",
    },
    {
      id: "4",
      name: "James",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      description:
        "Academic English tutor who helps with formal writing and speaking",
      language: "english",
      level: "advanced",
      personality: "Intellectual and thorough",
    },
    {
      id: "5",
      name: "Maria",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      description:
        "Spanish literature enthusiast who discusses books and culture",
      language: "spanish",
      level: "advanced",
      personality: "Passionate and expressive",
    },
    {
      id: "6",
      name: "Alex",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      description:
        "Travel English specialist who helps with vacation scenarios",
      language: "english",
      level: "beginner",
      personality: "Adventurous and helpful",
    },
  ],
  selectedAvatarId = "",
  onSelect = () => {},
  language = "english",
}: AIAvatarSelectionProps) => {
  // Filter avatars by selected language
  const filteredAvatars = avatars.filter(
    (avatar) => avatar.language === language,
  );

  return (
    <div className="w-full bg-slate-50 p-6 rounded-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Choose Your AI Conversation Partner
        </h2>
        <p className="text-gray-600">
          Select an AI avatar to practice your{" "}
          {language === "english" ? "English" : "Spanish"} conversation skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAvatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer h-full transition-all ${selectedAvatarId === avatar.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => onSelect(avatar.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={avatar.image} alt={avatar.name} />
                    <AvatarFallback>
                      {avatar.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Personality: {avatar.personality}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardTitle className="mt-2">{avatar.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {avatar.level.charAt(0).toUpperCase() +
                      avatar.level.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {avatar.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                {selectedAvatarId === avatar.id && (
                  <div className="flex items-center text-primary text-sm">
                    <Check className="mr-1 h-4 w-4" /> Selected
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIAvatarSelection;
