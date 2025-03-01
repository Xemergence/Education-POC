import React from "react";
import {
  Check,
  Briefcase,
  Plane,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GoalOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface LearningGoalsProps {
  selectedGoals?: string[];
  onSelect?: (goalId: string) => void;
  onContinue?: (selectedGoals: string[]) => void;
}

const LearningGoals: React.FC<LearningGoalsProps> = ({
  selectedGoals = [],
  onSelect = () => {},
  onContinue = () => {},
}) => {
  const [selected, setSelected] = React.useState<string[]>(selectedGoals);

  const goalOptions: GoalOption[] = [
    {
      id: "business",
      title: "Business Communication",
      description:
        "Learn vocabulary and phrases for professional settings, meetings, and negotiations.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "travel",
      title: "Travel",
      description:
        "Master essential phrases for navigating new places, ordering food, and making connections.",
      icon: <Plane className="h-6 w-6" />,
    },
    {
      id: "academic",
      title: "Academic Purposes",
      description:
        "Develop language skills for educational settings, research, and scholarly discussions.",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "casual",
      title: "Casual Conversation",
      description:
        "Build confidence in everyday interactions, social settings, and making friends.",
      icon: <MessageCircle className="h-6 w-6" />,
    },
  ];

  const handleSelect = (goalId: string) => {
    setSelected((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      } else {
        return [...prev, goalId];
      }
    });
    onSelect(goalId);
  };

  const handleContinue = () => {
    onContinue(selected);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            What are your learning goals?
          </h2>
          <p className="text-gray-600">
            Select the areas you'd like to focus on. This helps us personalize
            your learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {goalOptions.map((goal) => (
            <Card
              key={goal.id}
              className={`p-4 cursor-pointer transition-all border-2 ${selected.includes(goal.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
              onClick={() => handleSelect(goal.id)}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-full ${selected.includes(goal.id) ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                >
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    {selected.includes(goal.id) && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {goal.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <TooltipProvider>
          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-gray-500">
              You can change these preferences later in your profile settings.
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleContinue}
                  disabled={selected.length === 0}
                  className="px-6"
                >
                  Continue
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {selected.length === 0
                    ? "Select at least one goal"
                    : "Continue to next step"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LearningGoals;
