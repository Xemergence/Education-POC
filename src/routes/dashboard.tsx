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
} from "lucide-react";
import AIAvatarSelection from "../components/conversation/AIAvatarSelection";
import TopicSelection from "../components/conversation/TopicSelection";
import PerformanceSummary from "../components/dashboard/PerformanceSummary";
import UserDashboard from "../components/dashboard/UserDashboard";

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

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "english" | "spanish"
  >("english");
  const [showPracticeOptions, setShowPracticeOptions] = useState(false);

  // Check URL parameters to see if we should show practice options
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("practice") === "true") {
      setShowPracticeOptions(true);
    }
  }, []);

  // Mock data for the dashboard
  const mockData = {
    userProfile: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      level: "Intermediate",
      streak: 15,
      totalHours: 42,
      joinDate: "March 2023",
    },
    languageStats: {
      english: {
        language: "English",
        fluency: 68,
        vocabulary: 72,
        grammar: 65,
        pronunciation: 70,
      },
      spanish: {
        language: "Spanish",
        fluency: 45,
        vocabulary: 52,
        grammar: 40,
        pronunciation: 48,
      },
    },
    recentActivities: [
      {
        id: "1",
        activity: "Business English Conversation",
        date: "2 hours ago",
        duration: "25 min",
        score: 85,
      },
      {
        id: "2",
        activity: "Travel Vocabulary Practice",
        date: "Yesterday",
        duration: "15 min",
        score: 92,
      },
      {
        id: "3",
        activity: "Grammar Challenge",
        date: "3 days ago",
        duration: "20 min",
        score: 78,
      },
      {
        id: "4",
        activity: "Pronunciation Exercise",
        date: "5 days ago",
        duration: "10 min",
        score: 88,
      },
    ],
    performanceData: [
      { name: "Week 1", score: 65 },
      { name: "Week 2", score: 68 },
      { name: "Week 3", score: 72 },
      { name: "Week 4", score: 75 },
      { name: "Week 5", score: 70 },
      { name: "Week 6", score: 78 },
      { name: "Week 7", score: 82 },
    ],
    upcomingLessons: [
      {
        id: "1",
        title: "Advanced Conversation Techniques",
        date: "Tomorrow, 3:00 PM",
        duration: "45 min",
      },
      {
        id: "2",
        title: "Idiomatic Expressions Workshop",
        date: "Friday, 5:30 PM",
        duration: "30 min",
      },
    ],
    subscription: {
      plan: "Premium Plan",
      status: "Active",
      renewalDate: "June 15, 2023",
      billingCycle: "Monthly",
      nextPayment: "$19.99",
    },
  };

  const {
    userProfile,
    languageStats,
    recentActivities,
    performanceData,
    upcomingLessons,
    subscription,
  } = mockData;

  const handleStartPractice = () => {
    setShowPracticeOptions(true);
  };

  const handleBackToDashboard = () => {
    setShowPracticeOptions(false);
  };

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
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-gray-500">
                  {userProfile.level} • {userProfile.streak} day streak
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
                    <p className="text-3xl font-bold">
                      {userProfile.streak} days
                    </p>
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
                    <p className="text-3xl font-bold">
                      {userProfile.totalHours} hours
                    </p>
                    <p className="text-sm text-gray-500">
                      Since {userProfile.joinDate}
                    </p>
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
                    <p className="text-3xl font-bold">{userProfile.level}</p>
                    <p className="text-sm text-gray-500">B1-B2 CEFR</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-purple-600">
                    Level 4
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
                      <p>Unlimited AI conversation practice</p>
                      <p>All language topics access</p>
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
                        Your level: Intermediate
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
