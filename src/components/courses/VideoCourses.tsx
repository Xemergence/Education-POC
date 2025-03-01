import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Video, BookOpen, Clock, Star, Search, Filter } from "lucide-react";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: string;
  rating: number;
  lessons: number;
  progress?: number;
  onClick: (id: number) => void;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  thumbnail,
  duration,
  level,
  rating,
  lessons,
  progress = 0,
  onClick,
}: CourseCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <Badge className="absolute top-2 right-2" variant="secondary">
          {level}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{instructor}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          variant={progress > 0 ? "outline" : "default"}
        >
          {progress > 0 ? "Continue Learning" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface VideoCoursesProps {
  onCourseSelect?: (courseId: number) => void;
}

const VideoCourses = ({ onCourseSelect = () => {} }: VideoCoursesProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Spanish Conversation Basics",
      description:
        "Learn essential conversation patterns and vocabulary for everyday situations in Spanish.",
      instructor: "Maria Rodriguez",
      thumbnail:
        "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      duration: "4h 30m",
      level: "Beginner",
      rating: 4.8,
      lessons: 12,
      progress: 75,
      category: "conversation",
    },
    {
      id: 2,
      title: "Business English Mastery",
      description:
        "Develop professional English skills for meetings, presentations, and business correspondence.",
      instructor: "James Wilson",
      thumbnail:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      duration: "6h 15m",
      level: "Intermediate",
      rating: 4.6,
      lessons: 15,
      progress: 30,
      category: "business",
    },
    {
      id: 3,
      title: "Spanish for Travel",
      description:
        "Essential Spanish phrases and cultural tips for travelers visiting Spanish-speaking countries.",
      instructor: "Carlos Vega",
      thumbnail:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      duration: "3h 45m",
      level: "Beginner",
      rating: 4.9,
      lessons: 10,
      progress: 0,
      category: "travel",
    },
    {
      id: 4,
      title: "Advanced English Grammar",
      description:
        "Master complex grammar structures and nuances of the English language for academic and professional contexts.",
      instructor: "Elizabeth Taylor",
      thumbnail:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      duration: "8h 20m",
      level: "Advanced",
      rating: 4.7,
      lessons: 20,
      progress: 0,
      category: "grammar",
    },
    {
      id: 5,
      title: "Spanish Pronunciation Workshop",
      description:
        "Improve your Spanish accent and pronunciation with targeted exercises and audio examples.",
      instructor: "Ana Morales",
      thumbnail:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      duration: "5h 10m",
      level: "Intermediate",
      rating: 4.5,
      lessons: 14,
      progress: 0,
      category: "pronunciation",
    },
    {
      id: 6,
      title: "English for Academic Purposes",
      description:
        "Develop English skills for university studies, research papers, and academic presentations.",
      instructor: "Dr. Robert Chen",
      thumbnail:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      duration: "7h 45m",
      level: "Advanced",
      rating: 4.8,
      lessons: 18,
      progress: 0,
      category: "academic",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    // Filter by tab
    if (activeTab !== "all" && course.category !== activeTab) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleCourseClick = (id: number) => {
    setSelectedCourse(id);
    onCourseSelect(id);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Video Courses</h1>
          <p className="text-muted-foreground">
            Learn at your own pace with our comprehensive video lessons
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              thumbnail={course.thumbnail}
              duration={course.duration}
              level={course.level}
              rating={course.rating}
              lessons={course.lessons}
              progress={course.progress}
              onClick={handleCourseClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoCourses;
