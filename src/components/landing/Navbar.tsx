import React, { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui";
import { Globe, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "../auth/AuthModal";

interface NavbarProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  isAuthenticated?: boolean;
  userName?: string;
}

const Navbar = ({
  onSignInClick = () => {},
  onSignUpClick = () => {},
  isAuthenticated = false,
  userName = "",
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">(
    "signin",
  );
  const { language, setLanguage, t } = useLanguage();
  const languages = [
    { name: "English", code: "en", contextValue: "english" },
    { name: "Español", code: "es", contextValue: "spanish" },
  ];

  // Find the display name based on current language context
  const getCurrentLanguageDisplay = () => {
    const currentLang = languages.find(
      (lang) => lang.contextValue === language,
    );
    return currentLang ? currentLang.name : "English";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (languageName: string) => {
    const selectedLang = languages.find((lang) => lang.name === languageName);
    if (selectedLang) {
      setLanguage(selectedLang.contextValue as "english" | "spanish");
    }
  };

  const handleSignInClick = () => {
    setAuthModalTab("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  // Check if user is already authenticated from localStorage
  const [userData, setUserData] = useState<{
    isAuthenticated: boolean;
    userName: string;
  }>(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser
      ? JSON.parse(savedUser)
      : { isAuthenticated: false, userName: "" };
  });

  const handleAuthSuccess = (data: any) => {
    const newUserData = {
      isAuthenticated: true,
      userName: data.email?.split("@")[0] || "User",
    };

    // Save to state and localStorage
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));

    setIsAuthModalOpen(false);

    // Redirect to dashboard after successful authentication
    window.location.href = "/dashboard";
  };

  return (
    <>
      <nav className="w-full h-20 bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 z-50">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">LinguaAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Common navigation links for both authenticated and non-authenticated users */}
            <Link
              to="/features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t("nav.features")}
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </Link>

            {/* Authenticated-only links */}
            {userData.isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to="/courses"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("nav.courses")}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{getCurrentLanguageDisplay()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.name)}
                    className="cursor-pointer"
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Buttons */}
            {!userData.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={handleSignInClick}>
                  {t("nav.signin")}
                </Button>
                <Button onClick={handleSignUpClick}>{t("nav.signup")}</Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {userData.userName || t("nav.myaccount")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">{t("nav.dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/courses">{t("nav.courses")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("userData");
                      setUserData({ isAuthenticated: false, userName: "" });
                      window.location.href = "/";
                    }}
                  >
                    {t("nav.signout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 px-6 z-40">
            <div className="flex flex-col space-y-4">
              {/* Common navigation links for mobile */}
              <Link
                to="/features"
                className="text-gray-600 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.features")}
              </Link>
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>

              {/* Authenticated-only links for mobile */}
              {userData.isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <Link
                    to="/courses"
                    className="text-gray-600 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.courses")}
                  </Link>
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </>
              )}

              {/* Language Selector for Mobile */}
              <div className="py-2">
                <p className="text-sm text-gray-500 mb-2">
                  {language === "english"
                    ? "Select Language"
                    : "Seleccionar Idioma"}
                </p>
                <div className="flex flex-col space-y-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageChange(language.name);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left py-1 px-2 rounded ${language === language.contextValue ? "bg-primary/10 text-primary" : "text-gray-600"}`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Authentication Buttons for Mobile */}
              {!userData.isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignInClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("nav.signin")}
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignUpClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("nav.signup")}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="mt-2">
                  {userData.userName || t("nav.myaccount")}
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authModalTab}
        onSignInSuccess={handleAuthSuccess}
        onSignUpSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;
