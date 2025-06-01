import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
  Badge,
} from "../components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Globe,
  Award,
  MessageCircle,
  BookOpen,
  User,
  Loader2,
} from "lucide-react";
import AIAvatarSelection from "../components/conversation/AIAvatarSelection";
import TopicSelection from "../components/conversation/TopicSelection";
import {
  fetchUserDashboardData,
  DEMO_USER_ID,
  UserProfileData,
} from "../services/dashboardService";

interface LanguageStats {
  language: string;
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
}

interface RecentActivity {
  id: string;
  activity: string;
  date: string;
  duration: string;
  score: number;
}

interface UpcomingLesson {
  id: string;
  title: string;
  date: string;
  duration: string;
}

interface PerformanceData {
  name: string;
  score: number;
}

interface Subscription {
  plan: string;
  status: string;
  renewalDate: string;
  billingCycle: string;
  nextPayment: string;
  features: string[];
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: string;
  cefrLevel: string;
  levelNumber: number;
  streak: number;
  totalHours: number;
  joinDate: string;
  languageStats: {
    english: LanguageStats;
    spanish: LanguageStats;
  };
  recentActivities: RecentActivity[];
  performanceData: PerformanceData[];
  upcomingLessons: UpcomingLesson[];
  subscription: Subscription;
}

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "english" | "spanish"
  >("english");
  const [showPracticeOptions, setShowPracticeOptions] = useState(false);
  const [dashboardData, setDashboardData] = useState<UserProfileData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check URL parameters to see if we should show practice options
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("practice") === "true") {
      setShowPracticeOptions(true);
    }
  }, []);

  // Fetch dashboard data from Supabase
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserDashboardData(DEMO_USER_ID);
        if (data) {
          setDashboardData(data);
        } else {
          setError("Failed to load dashboard data");
        }
      } catch (err) {
        setError("An error occurred while loading data");
        console.error("Dashboard data loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Transform Supabase data to match component expectations
  const transformedData = dashboardData
    ? {
        name: dashboardData.profile.name || "User",
        email: dashboardData.profile.email || "",
        avatar:
          dashboardData.profile.avatar ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
        level: dashboardData.profile.level || "Beginner",
        cefrLevel: dashboardData.profile.cefr_level || "A1",
        levelNumber: dashboardData.profile.level_number || 1,
        streak: dashboardData.profile.streak || 0,
        totalHours: dashboardData.profile.total_hours || 0,
        joinDate: dashboardData.profile.join_date || "Recently",
        languageStats: {
          english: {
            language: "English",
            fluency: dashboardData.languageStats?.english_fluency || 0,
            vocabulary: dashboardData.languageStats?.english_vocabulary || 0,
            grammar: dashboardData.languageStats?.english_grammar || 0,
            pronunciation:
              dashboardData.languageStats?.english_pronunciation || 0,
          },
          spanish: {
            language: "Spanish",
            fluency: dashboardData.languageStats?.spanish_fluency || 0,
            vocabulary: dashboardData.languageStats?.spanish_vocabulary || 0,
            grammar: dashboardData.languageStats?.spanish_grammar || 0,
            pronunciation:
              dashboardData.languageStats?.spanish_pronunciation || 0,
          },
        },
        recentActivities: dashboardData.recentActivities.map((activity) => ({
          id: activity.id,
          activity: activity.activity,
          date: activity.date || "Recently",
          duration: activity.duration || "0 min",
          score: activity.score || 0,
        })),
        performanceData: dashboardData.performanceData.map((data) => ({
          name: data.name,
          score: data.score || 0,
        })),
        upcomingLessons: dashboardData.upcomingLessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          date: lesson.date || "TBD",
          duration: lesson.duration || "30 min",
        })),
        subscription: dashboardData.subscription
          ? {
              plan: dashboardData.subscription.plan || "Free Plan",
              status: dashboardData.subscription.status || "Inactive",
              renewalDate: dashboardData.subscription.renewal_date || "N/A",
              billingCycle:
                dashboardData.subscription.billing_cycle || "Monthly",
              nextPayment: dashboardData.subscription.next_payment || "$0.00",
              features: dashboardData.subscription.features || [],
            }
          : {
              plan: "Free Plan",
              status: "Inactive",
              renewalDate: "N/A",
              billingCycle: "Monthly",
              nextPayment: "$0.00",
              features: [],
            },
      }
    : null;

  // Extract data from the transformed profile for easier access
  const {
    name,
    email,
    avatar,
    level,
    cefrLevel,
    levelNumber,
    streak,
    totalHours,
    joinDate,
    languageStats,
    recentActivities,
    performanceData,
    upcomingLessons,
    subscription,
  } = transformedData || {
    name: "Loading...",
    email: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Loading",
    level: "Loading...",
    cefrLevel: "",
    levelNumber: 0,
    streak: 0,
    totalHours: 0,
    joinDate: "",
    languageStats: {
      english: {
        language: "English",
        fluency: 0,
        vocabulary: 0,
        grammar: 0,
        pronunciation: 0,
      },
      spanish: {
        language: "Spanish",
        fluency: 0,
        vocabulary: 0,
        grammar: 0,
        pronunciation: 0,
      },
    },
    recentActivities: [],
    performanceData: [],
    upcomingLessons: [],
    subscription: {
      plan: "",
      status: "",
      renewalDate: "",
      billingCycle: "",
      nextPayment: "",
      features: [],
    },
  };

  const handleStartPractice = () => {
    setShowPracticeOptions(true);
  };

  const handleBackToDashboard = () => {
    setShowPracticeOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {!showPracticeOptions ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-gray-500">
                  {level} • {streak} day streak
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={handleStartPractice}
              >
                <MessageCircle size={16} />
                Start Practice
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{streak} days</p>
                    <p className="text-sm text-gray-500">Keep it up!</p>
                  </div>
                  <div className="flex -space-x-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${i < 3 ? "bg-primary" : "bg-gray-200"}`}
                        >
                          <span className="text-xs text-white">{i + 1}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  Total Practice Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{totalHours} hours</p>
                    <p className="text-sm text-gray-500">Since {joinDate}</p>
                  </div>
                  <div className="h-10 w-20 bg-gray-100 rounded-md flex items-end overflow-hidden">
                    <div className="h-6 w-full bg-primary rounded-md"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award size={18} className="text-primary" />
                  Current Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{level}</p>
                    <p className="text-sm text-gray-500">{cefrLevel}</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-purple-600">
                    Level {levelNumber}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Language Progress</CardTitle>
                  <Tabs defaultValue="english" className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="english"
                        onClick={() => setSelectedLanguage("english")}
                      >
                        English
                      </TabsTrigger>
                      <TabsTrigger
                        value="spanish"
                        onClick={() => setSelectedLanguage("spanish")}
                      >
                        Spanish
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>
                  Your progress in {languageStats[selectedLanguage].language}{" "}
                  skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fluency</span>
                      <span className="text-sm text-gray-500">
                        {languageStats[selectedLanguage].fluency}%
                      </span>
                    </div>
                    <Progress
                      value={languageStats[selectedLanguage].fluency}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Vocabulary</span>
                      <span className="text-sm text-gray-500">
                        {languageStats[selectedLanguage].vocabulary}%
                      </span>
                    </div>
                    <Progress
                      value={languageStats[selectedLanguage].vocabulary}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Grammar</span>
                      <span className="text-sm text-gray-500">
                        {languageStats[selectedLanguage].grammar}%
                      </span>
                    </div>
                    <Progress
                      value={languageStats[selectedLanguage].grammar}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Pronunciation</span>
                      <span className="text-sm text-gray-500">
                        {languageStats[selectedLanguage].pronunciation}%
                      </span>
                    </div>
                    <Progress
                      value={languageStats[selectedLanguage].pronunciation}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Lessons</CardTitle>
                <CardDescription>
                  Your scheduled learning sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLessons.length > 0 ? (
                    upcomingLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-medium">{lesson.title}</h3>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{lesson.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <BookOpen className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-gray-500">No upcoming lessons</p>
                      <Button variant="outline" className="mt-4">
                        Schedule a Lesson
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Your weekly performance score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#8884d8"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-blue-700">
                        {subscription.plan}
                      </h3>
                      <Badge className="bg-blue-500">
                        {subscription.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {subscription.features.map((feature, index) => (
                        <p key={index}>{feature}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Renewal Date</span>
                      <span className="font-medium">
                        {subscription.renewalDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Billing Cycle</span>
                      <span className="font-medium">
                        {subscription.billingCycle}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Payment</span>
                      <span className="font-medium">
                        {subscription.nextPayment}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{activity.date}</span>
                          <span>{activity.duration}</span>
                        </div>
                      </div>
                      <Badge
                        variant={activity.score >= 80 ? "default" : "outline"}
                      >
                        {activity.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleStartPractice}
                  >
                    Start New Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Start a New Practice Session</h1>
            <p className="text-gray-500">
              Choose a topic and AI avatar to begin your conversation practice
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Select Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant={
                      selectedLanguage === "english" ? "default" : "outline"
                    }
                    className="flex-1 py-6"
                    onClick={() => setSelectedLanguage("english")}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg mb-1">English</div>
                      <div className="text-sm text-gray-500">
                        Your level: {level}
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant={
                      selectedLanguage === "spanish" ? "default" : "outline"
                    }
                    className="flex-1 py-6"
                    onClick={() => setSelectedLanguage("spanish")}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg mb-1">Spanish</div>
                      <div className="text-sm text-gray-500">
                        Your level: Beginner
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Select Conversation Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TopicSelection selectedLanguage={selectedLanguage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Choose AI Avatar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIAvatarSelection language={selectedLanguage} />
              </CardContent>
            </Card>

            <div className="flex justify-center mt-4">
              <Button
                size="lg"
                className="px-8"
                onClick={() => (window.location.href = "/courses")}
              >
                Begin Conversation
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
