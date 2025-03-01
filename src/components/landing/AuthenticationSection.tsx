import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

interface AuthenticationSectionProps {
  className?: string;
  defaultTab?: "sign-in" | "sign-up";
  onSignIn?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onSignUp?: (data: any) => void;
  onSocialLogin?: (provider: "google" | "facebook" | "apple") => void;
}

const AuthenticationSection = ({
  className = "",
  defaultTab = "sign-in",
  onSignIn = () => {},
  onSignUp = () => {},
  onSocialLogin = () => {},
}: AuthenticationSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSignIn(data);
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUp = (data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSignUp(data);
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
    onSocialLogin(provider);
  };

  return (
    <section className={`w-full py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Language Learning Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create an account to start practicing conversations with our AI
              language partners or sign in to continue your learning journey.
            </p>
          </div>

          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Left side - Authentication tabs */}
                <div className="md:w-1/2 p-8">
                  <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                      <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sign-in" className="mt-0">
                      <SocialLoginButtons
                        onGoogleLogin={() => handleSocialLogin("google")}
                        onFacebookLogin={() => handleSocialLogin("facebook")}
                        onAppleLogin={() => handleSocialLogin("apple")}
                        className="mb-4"
                      />
                      <SignInForm onSubmit={handleSignIn} />
                    </TabsContent>

                    <TabsContent value="sign-up" className="mt-0">
                      <SocialLoginButtons
                        onGoogleLogin={() => handleSocialLogin("google")}
                        onFacebookLogin={() => handleSocialLogin("facebook")}
                        onAppleLogin={() => handleSocialLogin("apple")}
                        className="mb-4"
                      />
                      <SignUpForm
                        onSubmit={handleSignUp}
                        isLoading={isLoading}
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right side - Image/Illustration */}
                <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-8 hidden md:block">
                  <div className="text-white max-w-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Practice Languages with AI Conversation Partners
                      </h3>
                      <p className="mb-6">
                        Improve your language skills by having natural
                        conversations with our AI avatars. Practice anytime,
                        anywhere.
                      </p>
                      <div className="flex justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                          alt="AI Language Partner"
                          className="rounded-lg shadow-lg max-w-xs"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthenticationSection;
