import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import LanguageSelection from "./LanguageSelection";
import ProficiencyLevel from "./ProficiencyLevel";
import LearningGoals from "./LearningGoals";
import AIIntroduction from "./AIIntroduction";

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: (userData: OnboardingData) => void;
}

interface OnboardingData {
  language: string;
  proficiencyLevel: string;
  learningGoals: string[];
}

const OnboardingModal = ({
  isOpen = true,
  onClose = () => {},
  onComplete = () => {},
}: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<OnboardingData>({
    language: "",
    proficiencyLevel: "beginner",
    learningGoals: [],
  });

  const steps = [
    { id: 1, title: "Language" },
    { id: 2, title: "Proficiency" },
    { id: 3, title: "Goals" },
    { id: 4, title: "Meet AI" },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setUserData({ ...userData, language });
  };

  const handleProficiencySelect = (proficiencyLevel: string) => {
    setUserData({ ...userData, proficiencyLevel });
  };

  const handleGoalsSelect = (learningGoals: string[]) => {
    setUserData({ ...userData, learningGoals });
    handleNext();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-center">
            Personalize Your Learning Experience
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 border-b bg-gray-50">
          <Tabs value={step.toString()} className="w-full">
            <TabsList className="w-full grid grid-cols-4 gap-2">
              {steps.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id.toString()}
                  disabled={true}
                  className={`${step >= s.id ? "bg-blue-50 text-blue-700" : ""}`}
                >
                  {s.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="p-0 h-[500px] overflow-y-auto">
          {step === 1 && (
            <LanguageSelection
              selectedLanguage={userData.language}
              onSelect={handleLanguageSelect}
            />
          )}
          {step === 2 && (
            <ProficiencyLevel
              selectedLevel={userData.proficiencyLevel}
              onSelectLevel={handleProficiencySelect}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <LearningGoals
              selectedGoals={userData.learningGoals}
              onContinue={handleGoalsSelect}
            />
          )}
          {step === 4 && <AIIntroduction onContinue={handleNext} />}
        </div>

        {(step === 1 || step === 4) && (
          <div className="p-6 border-t flex justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleNext}
              disabled={step === 1 && !userData.language}
              className="flex items-center gap-2"
            >
              {step === 4 ? "Complete" : "Next"}{" "}
              {step < 4 && <ChevronRight size={16} />}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
