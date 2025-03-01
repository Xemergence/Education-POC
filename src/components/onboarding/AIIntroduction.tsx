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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Mic, Video } from "lucide-react";

interface AIIntroductionProps {
  avatarName?: string;
  avatarImage?: string;
  description?: string;
  onContinue?: () => void;
}

const AIIntroduction = ({
  avatarName = "Sofia",
  avatarImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
  description = "Meet your AI language partner who will help you practice conversational skills. You can chat, have voice conversations, or even video calls to improve your language fluency in a safe, judgment-free environment.",
  onContinue = () => console.log("Continue clicked"),
}: AIIntroductionProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Meet Your AI Language Partner
          </CardTitle>
          <CardDescription className="mt-2">
            Your personalized conversation practice assistant
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarImage src={avatarImage} alt={avatarName} />
              <AvatarFallback>
                {avatarName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-white"></div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium mb-1">{avatarName}</h3>
            <p className="text-sm text-muted-foreground">
              AI Language Assistant
            </p>
          </div>

          <p className="text-center text-muted-foreground">{description}</p>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">Text Chat</span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <Mic className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">Voice Chat</span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <Video className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">Video Chat</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <Button onClick={onContinue} className="px-8">
            Continue
          </Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Your AI partner uses advanced language models to provide natural
        conversation practice.
        <br />
        All interactions are private and designed to help you improve your
        language skills.
      </p>
    </div>
  );
};

export default AIIntroduction;
