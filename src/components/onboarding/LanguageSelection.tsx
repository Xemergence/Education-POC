import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

interface LanguageOption {
  id: string;
  name: string;
  flag: string;
  description: string;
}

interface LanguageSelectionProps {
  onSelect?: (languageId: string) => void;
  selectedLanguage?: string;
}

const LanguageSelection = ({
  onSelect = () => {},
  selectedLanguage = "",
}: LanguageSelectionProps) => {
  const languages: LanguageOption[] = [
    {
      id: "en",
      name: "English",
      flag: "🇺🇸",
      description:
        "Learn conversational English with native-speaking AI tutors",
    },
    {
      id: "es",
      name: "Spanish",
      flag: "🇪🇸",
      description:
        "Practice Spanish with AI tutors from various Spanish-speaking regions",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Learning Language
        </h2>
        <p className="text-gray-600">
          Select the language you want to learn and practice with our AI
          conversation partners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedLanguage === language.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => onSelect(language.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{language.flag}</span>
                  <CardTitle>{language.name}</CardTitle>
                </div>
                {selectedLanguage === language.id && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {language.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant={
                  selectedLanguage === language.id ? "default" : "outline"
                }
                className="w-full"
                onClick={() => onSelect(language.id)}
              >
                {selectedLanguage === language.id ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Don't see your preferred language? We're constantly adding new
          languages to our platform.
        </p>
      </div>
    </div>
  );
};

export default LanguageSelection;
