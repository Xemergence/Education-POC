import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui";
import {
  BookOpen,
  MessageCircle,
  Video,
  Award,
  Clock,
  Calendar,
  ChevronRight,
} from "lucide-react";

interface UserDashboardProps {
  userName?: string;
  userAvatar?: string;
  userLevel?: string;
  userLanguage?: string;
}

const UserDashboard = ({
  userName = "Sarah",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  userLevel = "Intermediate",
  userLanguage = "Spanish",
}: UserDashboardProps) => {
  // Mock data for the dashboard
  const courseProgress = [
    {
      id: 1,
      name: "Conversation Basics",
      progress: 100,
      total: 10,
      completed: 10,
    },
    { id: 2, name: "Travel Vocabulary", progress: 70, total: 10, completed: 7 },
    { id: 3, name: "Business Spanish", progress: 30, total: 10, completed: 3 },
    { id: 4, name: "Advanced Grammar", progress: 0, total: 10, completed: 0 },
  ];

  const upcomingLessons = [
    {
      id: 1,
      title: "Restaurant Conversations",
      date: "Today, 3:00 PM",
      type: "AI Practice",
    },
    {
      id: 2,
      title: "Travel Vocabulary Part 8",
      date: "Tomorrow, 5:00 PM",
      type: "Video Lesson",
    },
    {
      id: 3,
      title: "Grammar Review Session",
      date: "May 15, 2:00 PM",
      type: "Live Class",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Conversation",
      description: "Completed your first AI conversation",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Course Completion",
      description: "Completed Conversation Basics course",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "7-Day Streak",
      description: "Practiced for 7 consecutive days",
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 bg-white">
      {/* User welcome section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-muted-foreground">
              {userLevel} • {userLanguage} • Last login: Today at 9:30 AM
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/dashboard?practice=true")}
          >
            <MessageCircle className="h-4 w-4" />
            Practice Now
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/courses")}
          >
            <Video className="h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Dashboard tabs */}
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Lessons</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Progress tab content */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Learning Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h 30m</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2h 15m this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Keep it going!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Vocabulary Mastered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342 words</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +28 this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 completed</div>
                <p className="text-xs text-muted-foreground mt-1">
                  3 this week
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Course Progress</h2>
          <div className="space-y-4">
            {courseProgress.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {course.completed}/{course.total} lessons
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">
                      {course.progress}% complete
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Upcoming lessons tab content */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {upcomingLessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="p-6 flex justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {lesson.type === "AI Practice" ? (
                        <MessageCircle className="h-5 w-5 text-primary" />
                      ) : lesson.type === "Video Lesson" ? (
                        <Video className="h-5 w-5 text-primary" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {lesson.date}
                        </span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2 inline-block">
                        {lesson.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {lesson.type === "AI Practice" ? "Practice" : "Watch"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">View Full Schedule</Button>
          </div>
        </TabsContent>

        {/* Achievements tab content */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">View All Achievements</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
