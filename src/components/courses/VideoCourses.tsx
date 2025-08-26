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
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: string;
  rating: number;
  lessons: number;
  progress?: number;
  onClick: (id: string) => void;
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
  onCourseSelect?: (courseId: string) => void;
}

const VideoCourses = ({ onCourseSelect = () => {} }: VideoCoursesProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (!error && data) {
        const onlyFirst = data.filter((c: any) => c.title === 'Numbers 1–10');
        const mapped: CourseCardProps[] = await Promise.all(
          (onlyFirst.length ? onlyFirst : data).map(async (c: any) => {
            // Count lessons for this course
            const { count: totalLessons } = await supabase
              .from('lessons')
              .select('id', { count: 'exact', head: true })
              .eq('course_id', c.id);

            // Count completed lessons for this user
            let completed = 0;
            if (user?.id && (totalLessons || 0) > 0) {
              const { data: lessonIds } = await supabase
                .from('lessons')
                .select('id')
                .eq('course_id', c.id);
              const ids = (lessonIds || []).map((l: any) => l.id);
              if (ids.length) {
                const { count: completedCount } = await supabase
                  .from('user_progress')
                  .select('id', { count: 'exact', head: true })
                  .eq('user_id', user.id)
                  .eq('status', 'completed')
                  .in('lesson_id', ids);
                completed = completedCount || 0;
              }
            }

            const progress = (totalLessons && totalLessons > 0)
              ? Math.round((completed / (totalLessons as number)) * 100)
              : 0;

            return {
              id: c.id,
              title: c.title,
              description: c.description || "",
              instructor: c.instructor || "Lingua Team",
              thumbnail: c.thumbnail || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
              duration: c.duration || "",
              level: c.level || "Beginner",
              rating: 5.0,
              lessons: (totalLessons as number) || 0,
              progress,
              onClick: () => {},
            } as CourseCardProps;
          })
        );
        setCourses(mapped);
      }
    };
    load();
  }, [user?.id]);

  const filteredCourses = courses.filter((course) => {
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCourseClick = (id: string) => {
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