import React from "react";
import { Check } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

interface ProficiencyLevelProps {
  onNext?: () => void;
  onBack?: () => void;
  selectedLevel?: string;
  onSelectLevel?: (level: string) => void;
}

const proficiencyLevels = [
  {
    id: "beginner",
    title: "Beginner",
    description:
      "You know a few words and basic phrases. You're just starting your language journey.",
    examples: "Can introduce yourself and ask simple questions.",
  },
  {
    id: "elementary",
    title: "Elementary",
    description:
      "You can communicate in simple ways on familiar topics. You understand basic conversations.",
    examples:
      "Can order food, ask for directions, and have basic conversations.",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description:
      "You can discuss familiar topics with reasonable fluency and understand the main points of conversations.",
    examples:
      "Can explain your opinions, describe experiences, and understand native speakers with some effort.",
  },
  {
    id: "advanced",
    title: "Advanced",
    description:
      "You can express yourself fluently and spontaneously. You understand complex texts and conversations.",
    examples:
      "Can participate in discussions, understand TV shows, and read newspapers with little difficulty.",
  },
  {
    id: "proficient",
    title: "Proficient",
    description:
      "You have near-native fluency and can use the language precisely and effectively for professional or academic purposes.",
    examples:
      "Can understand virtually everything heard or read, and express complex ideas with nuance.",
  },
];

const ProficiencyLevel = ({
  onNext = () => {},
  onBack = () => {},
  selectedLevel = "beginner",
  onSelectLevel = () => {},
}: ProficiencyLevelProps) => {
  return (
    <div className="w-full h-full bg-white p-8 rounded-lg flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What's your proficiency level?
        </h2>
        <p className="text-gray-600">
          This helps us personalize your learning experience and match you with
          appropriate AI conversation partners.
        </p>
      </div>

      <div className="flex-grow overflow-y-auto py-4">
        <RadioGroup
          value={selectedLevel}
          onValueChange={onSelectLevel}
          className="space-y-4"
        >
          {proficiencyLevels.map((level) => (
            <Card
              key={level.id}
              className={`p-4 cursor-pointer border-2 transition-all ${selectedLevel === level.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
              onClick={() => onSelectLevel(level.id)}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem
                  value={level.id}
                  id={level.id}
                  className="mt-1"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <Label
                      htmlFor={level.id}
                      className="text-lg font-medium cursor-pointer"
                    >
                      {level.title}
                    </Label>
                    {selectedLevel === level.id && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{level.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Examples:</span>{" "}
                    {level.examples}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <Button variant="outline" onClick={onBack} className="px-6">
          Back
        </Button>
        <Button onClick={onNext} className="px-8 bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProficiencyLevel;
