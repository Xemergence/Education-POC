import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SocialLoginButtons from "./SocialLoginButtons";
import { supabase } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
  onSignInSuccess?: (data: any) => void;
  onSignUpSuccess?: (data: any) => void;
}

const AuthModal = ({
  isOpen = true,
  onOpenChange = () => {},
  defaultTab = "signin",
  onSignInSuccess = () => {},
  onSignUpSuccess = () => {},
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: any) => {
    setIsLoading(true);
    try {
      const { email, password } = data || {};
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onSignInSuccess(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Sign in error:", error);
      alert((error as any)?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: any) => {
    setIsLoading(true);
    try {
      const { email, password } = data || {};
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      onSignUpSuccess(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Sign up error:", error);
      alert((error as any)?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implementation would connect to the respective OAuth provider
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <DialogHeader className="pt-6 px-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "signin" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "signin"
              ? "Sign in to continue your language learning journey"
              : "Join our community of language learners today"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={defaultTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6">
            <SocialLoginButtons
              onGoogleLogin={() => handleSocialLogin("google")}
              onFacebookLogin={() => handleSocialLogin("facebook")}
              onAppleLogin={() => handleSocialLogin("apple")}
            />
          </div>

          <TabsContent value="signin" className="p-6 pt-2">
            <SignInForm
              onSubmit={handleSignIn}
              onForgotPassword={() => console.log("Forgot password clicked")}
            />
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => setActiveTab("signup")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="p-6 pt-2">
            <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => setActiveTab("signin")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 bg-gray-50 text-center text-xs text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;