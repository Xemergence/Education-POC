import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Video,
  BookOpen,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface CourseMaterialProps {
  courseId?: number;
  onBack?: () => void;
}

const CourseMaterial = ({
  courseId = 1,
  onBack = () => {},
}: CourseMaterialProps) => {
  const [activeTab, setActiveTab] = useState("video");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);

  // Mock course data
  const course = {
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
    progress: 25,
    lessons: [
      {
        id: 0,
        title: "Introduction to Spanish Conversations",
        duration: "15:30",
        videoUrl: "https://example.com/video1.mp4",
        description: "An overview of the course and basic Spanish greetings.",
        materials: [
          { id: 1, title: "Course Syllabus", type: "pdf" },
          { id: 2, title: "Spanish Greetings Cheat Sheet", type: "pdf" },
        ],
        transcript:
          "Welcome to Spanish Conversation Basics! In this course, we'll learn essential phrases and vocabulary for everyday conversations in Spanish. Let's start with basic greetings: 'Hola' means 'Hello', 'Buenos días' means 'Good morning'...",
      },
      {
        id: 1,
        title: "Greetings and Introductions",
        duration: "22:15",
        videoUrl: "https://example.com/video2.mp4",
        description:
          "Learn how to introduce yourself and greet others in Spanish.",
        materials: [
          { id: 3, title: "Introduction Phrases Worksheet", type: "pdf" },
          { id: 4, title: "Practice Dialogues", type: "doc" },
        ],
        transcript:
          "In this lesson, we'll focus on introductions. To introduce yourself, you can say 'Me llamo...' which means 'My name is...' or 'Soy...' which simply means 'I am...'. Let's practice these phrases together...",
      },
      {
        id: 2,
        title: "Asking Basic Questions",
        duration: "18:45",
        videoUrl: "https://example.com/video3.mp4",
        description: "Learn to ask and answer common questions in Spanish.",
        materials: [
          { id: 5, title: "Question Words in Spanish", type: "pdf" },
          { id: 6, title: "Practice Exercises", type: "pdf" },
        ],
        transcript:
          "Now let's learn how to ask questions in Spanish. The main question words are: '¿Qué?' (What?), '¿Quién?' (Who?), '¿Dónde?' (Where?), '¿Cuándo?' (When?), '¿Por qué?' (Why?), and '¿Cómo?' (How?)...",
      },
      {
        id: 3,
        title: "Everyday Vocabulary",
        duration: "25:10",
        videoUrl: "https://example.com/video4.mp4",
        description: "Essential vocabulary for daily conversations.",
        materials: [
          { id: 7, title: "Vocabulary List", type: "pdf" },
          { id: 8, title: "Flashcards", type: "zip" },
        ],
        transcript:
          "In this lesson, we'll cover essential vocabulary for everyday situations. We'll learn words related to time, food, transportation, and more. Let's start with time expressions: 'hoy' means 'today', 'mañana' means 'tomorrow'...",
      },
    ],
  };

  const currentLessonData = course.lessons[currentLesson];

  const handleLessonClick = (index: number) => {
    setCurrentLesson(index);
  };

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 bg-white">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2"
        onClick={onBack}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Courses
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar with lessons */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>Instructor: {course.instructor}</CardDescription>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>
                    {Math.round(
                      (completedLessons.length / course.lessons.length) * 100,
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (completedLessons.length / course.lessons.length) * 100
                  }
                  className="h-2"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-1">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="mb-2">
                      <button
                        className={`w-full text-left p-3 rounded-md flex items-start gap-3 ${currentLesson === index ? "bg-primary/10" : "hover:bg-muted"}`}
                        onClick={() => handleLessonClick(index)}
                      >
                        <div className="mt-0.5">
                          {completedLessons.includes(index) ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Video className="h-3 w-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {currentLessonData.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {currentLessonData.description}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleLessonComplete}>
                  {completedLessons.includes(currentLesson)
                    ? "Completed"
                    : "Mark as Complete"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                defaultValue="video"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="px-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="video" className="m-0">
                  <div className="p-6">
                    <AspectRatio
                      ratio={16 / 9}
                      className="bg-muted rounded-md overflow-hidden"
                    >
                      <div className="flex items-center justify-center h-full bg-black/5">
                        <Video className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </AspectRatio>
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={handlePreviousLesson}
                        disabled={currentLesson === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </Button>
                      <Button
                        onClick={handleNextLesson}
                        disabled={currentLesson === course.lessons.length - 1}
                        className="flex items-center gap-2"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="m-0">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">
                      Lesson Materials
                    </h3>
                    <div className="space-y-3">
                      {currentLessonData.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {material.type === "pdf" ? (
                              <FileText className="h-5 w-5 text-red-500" />
                            ) : material.type === "doc" ? (
                              <FileText className="h-5 w-5 text-blue-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span>{material.title}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transcript" className="m-0">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">
                      Lesson Transcript
                    </h3>
                    <div className="p-4 border rounded-md bg-muted/30">
                      <p className="whitespace-pre-line">
                        {currentLessonData.transcript}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterial;
