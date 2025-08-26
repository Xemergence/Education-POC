import React from "react";

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onAppleLogin?: () => void;
  className?: string;
}

const SocialLoginButtons = ({
  onGoogleLogin = () => {},
  onFacebookLogin = () => {},
  onAppleLogin = () => {},
  className = "",
}: SocialLoginButtonsProps) => {
  // Social login options removed - return null
  return null;
};

export default SocialLoginButtons;
