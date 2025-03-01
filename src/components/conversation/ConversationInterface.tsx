import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Globe,
  Settings,
  Paperclip,
  Smile,
  MoreHorizontal,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ConversationInterfaceProps {
  avatar?: string;
  language?: "english" | "spanish";
  topic?: string;
  onSendMessage?: (message: string) => void;
  onEndConversation?: () => void;
}

const ConversationInterface = ({
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=language-tutor",
  language = "english",
  topic = "Ordering food at a restaurant",
  onSendMessage = () => {},
  onEndConversation = () => {},
}: ConversationInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI language tutor. Let's practice ordering food at a restaurant in English. How would you start a conversation with a waiter?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    onSendMessage(inputText);
    setInputText("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "That's a good start! How would you ask about the specials of the day?",
        "Great job! Now, how would you order a specific dish?",
        "Excellent! Let's practice asking for the check.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAiMessage]);
    }, 1500);
  };

  const toggleMicrophone = () => {
    setIsMicActive(!isMicActive);
    // In a real implementation, this would start/stop speech recognition
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In a real implementation, this would enable/disable text-to-speech
  };

  return (
    <div className="flex flex-col h-[700px] w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Conversation Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border-2 border-indigo-100">
            <AvatarImage src={avatar} alt="AI Avatar" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-800">AI Language Tutor</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Globe className="h-4 w-4 mr-1" />
              <span className="capitalize">{language}</span>
              <span className="mx-2">•</span>
              <span>{topic}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleAudio}>
                  {isAudioEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isAudioEnabled ? "Disable audio" : "Enable audio"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Conversation settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" onClick={onEndConversation}>
            End Session
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-400"}`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isMicActive && (
            <div className="flex justify-center my-4">
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full animate-pulse flex items-center">
                <Mic className="h-4 w-4 mr-2" />
                Listening...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert emoji</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={`Type your message in ${language}...`}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMicrophone}
                  className={isMicActive ? "text-red-500" : "text-gray-500"}
                >
                  {isMicActive ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isMicActive ? "Stop recording" : "Start recording"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
          <div>
            {language === "english"
              ? "Practicing English"
              : "Practicando Español"}
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              <MoreHorizontal className="h-3 w-3 mr-1" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationInterface;
