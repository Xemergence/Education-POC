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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import ConversationInterface from "@/components/conversation/ConversationInterface";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

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
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const { user } = useAuth();

  // New DB-backed state
  const [dbCourse, setDbCourse] = useState<any | null>(null);
  const [dbLessons, setDbLessons] = useState<any[]>([]);
  const [dbMaterials, setDbMaterials] = useState<any[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [flags, setFlags] = useState<any>({
    watched_video: false,
    viewed_materials: false,
    read_transcript: false,
    practiced_script: false,
    practiced_open: false,
  });

  // Load course + lessons from Supabase (Numbers 1–10)
  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Fetch the only seeded course
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1);
      const course = courses?.[0] || null;
      setDbCourse(course);

      if (course) {
        const { data: lessons } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', course.id)
          .order('order', { ascending: true });
        setDbLessons(lessons || []);

        const firstLessonId = lessons?.[0]?.id;
        if (firstLessonId) {
          const { data: mats } = await supabase
            .from('materials')
            .select('*')
            .eq('lesson_id', firstLessonId);
          setDbMaterials(mats || []);
        }

        if (user?.id) {
          const { data: prog } = await supabase
            .from('user_progress')
            .select('lesson_id,status,watched_video,viewed_materials,read_transcript,practiced_script,practiced_open')
            .eq('user_id', user.id);
          const completed = (prog || [])
            .filter((p: any) => p.status === 'completed')
            .map((p: any) => p.lesson_id as string);
          setCompletedLessonIds(completed);
          const current = (prog || []).find((p: any) => p.lesson_id === firstLessonId) || {};
          setFlags({
            watched_video: !!current.watched_video,
            viewed_materials: !!current.viewed_materials,
            read_transcript: !!current.read_transcript,
            practiced_script: !!current.practiced_script,
            practiced_open: !!current.practiced_open,
          });
        }
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // When lesson changes, refresh materials + flags
  const handleLessonClick = async (index: number) => {
    setCurrentLesson(index);
    const lesson = dbLessons[index];
    if (lesson?.id) {
      const { data: mats } = await supabase
        .from('materials')
        .select('*')
        .eq('lesson_id', lesson.id);
      setDbMaterials(mats || []);

      if (user?.id) {
        const { data: progRow } = await supabase
          .from('user_progress')
          .select('watched_video,viewed_materials,read_transcript,practiced_script,practiced_open')
          .eq('user_id', user.id)
          .eq('lesson_id', lesson.id)
          .maybeSingle();
        setFlags({
          watched_video: !!progRow?.watched_video,
          viewed_materials: !!progRow?.viewed_materials,
          read_transcript: !!progRow?.read_transcript,
          practiced_script: !!progRow?.practiced_script,
          practiced_open: !!progRow?.practiced_open,
        });
      }
    }
  };

  // Helper to update flags in DB
  const updateProgressFlag = async (patch: Partial<typeof flags>) => {
    const lesson = dbLessons[currentLesson];
    if (!lesson?.id || !user?.id) return;
    const newFlags = { ...flags, ...patch };
    setFlags(newFlags);
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      status: completedLessonIds.includes(lesson.id) ? 'completed' : 'in_progress',
      last_viewed_at: new Date().toISOString(),
      watched_video: newFlags.watched_video,
      viewed_materials: newFlags.viewed_materials,
      read_transcript: newFlags.read_transcript,
      practiced_script: newFlags.practiced_script,
      practiced_open: newFlags.practiced_open,
    });
  };

  // Mark flags when visiting tabs
  React.useEffect(() => {
    if (activeTab === 'video' && !flags.watched_video) updateProgressFlag({ watched_video: true });
    if (activeTab === 'materials' && !flags.viewed_materials) updateProgressFlag({ viewed_materials: true });
    if (activeTab === 'transcript' && !flags.read_transcript) updateProgressFlag({ read_transcript: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentLesson]);

  const currentLessonData = dbLessons[currentLesson] || {} as any;
  const numbersTranscript = `Counting Numbers (1–10):\n1 One (wʌn)\n2 Two (tuː)\n3 Three (θriː)\n4 Four (fɔːr)\n5 Five (faɪv)\n6 Six (sɪks)\n7 Seven (ˈsɛv.ən)\n8 Eight (eɪt)\n9 Nine (naɪn)\n10 Ten (tɛn)\n\nAdding Numbers and Basic Operations:\n2 + 3 = 5 (two plus three equals five)\n4 − 1 = 3 (four minus one equals three)\n2 × 2 = 4 (two times two equals four)\n6 ÷ 3 = 2 (six divided by three equals two)\n\nWhat time is it? (Examples)\nIt's 3:00 (three o'clock).\nIt's 3:30 (three thirty / half past three).\nIt's 3:15 (three fifteen / a quarter past three).\n\nHow much money is there?\nThere are 5 dollars.\nThere are 10 euros.\nThere are 100 yen.\n\nMonetary units in America, Europe, and Asia:\nUSA: dollars (USD), cents.\nEurope: euros (EUR), cents.\nJapan: yen (JPY).\n`; 
  const transcriptToShow = currentLessonData?.transcript?.trim()?.length ? currentLessonData.transcript : numbersTranscript;
  const [practiceMode, setPracticeMode] = useState<'script' | 'open'>('script');

  const handleLessonComplete = async () => {
    const lesson = dbLessons[currentLesson];
    if (!lesson?.id || !user?.id) return;
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      status: 'completed',
      last_viewed_at: new Date().toISOString(),
      watched_video: flags.watched_video,
      viewed_materials: flags.viewed_materials,
      read_transcript: flags.read_transcript,
      practiced_script: flags.practiced_script,
      practiced_open: flags.practiced_open,
    });
    setCompletedLessonIds((prev) => Array.from(new Set([...prev, lesson.id])));
  };

  const startPractice = async () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      alert('Speech Recognition is not supported in this browser');
      return;
    }
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    setRecognizedText("");
    setFeedback("");
    setRecording(true);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setRecognizedText(text);
    };
    recognition.onend = () => {
      setRecording(false);
    };
    recognition.start();
  };

  const evaluatePractice = async () => {
    if (!recognizedText) return;
    const { data, error } = await supabase.functions.invoke('supabase-functions-chat', {
      body: {
        lesson_id: currentLessonData?.id || null,
        transcript: recognizedText,
        user_id: user?.id || null,
      },
    });
    if (!error) setFeedback((data as any)?.feedback || "");
    // Mark script practice done
    if (!flags.practiced_script) updateProgressFlag({ practiced_script: true });
  };

  const progressPct = dbLessons.length
    ? Math.round((completedLessonIds.length / dbLessons.length) * 100)
    : 0;

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
          <Card className="min-h-[720px]">
            <CardHeader className="pb-3">
              <CardTitle>{dbCourse?.title || 'Numbers 1–10'}</CardTitle>
              <CardDescription>Instructor: {dbCourse?.instructor || 'Lingua Team'}</CardDescription>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>
                    {progressPct}%
                  </span>
                </div>
                <Progress
                  value={progressPct}
                  className="h-2"
                />
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {flags.watched_video ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />}
                    <span>Video watched</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {flags.viewed_materials ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />}
                    <span>Materials viewed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {flags.read_transcript ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />}
                    <span>Transcript read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {(flags.practiced_script && flags.practiced_open) ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />}
                    <span>Practice sessions (script + open)</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-1">
                  {dbLessons.map((lesson, index) => (
                    <div key={lesson.id} className="mb-2">
                      <button
                        className={`w-full text-left p-3 rounded-md flex items-start gap-3 ${currentLesson === index ? "bg-primary/10" : "hover:bg-muted"}`}
                        onClick={() => handleLessonClick(index)}
                      >
                        <div className="mt-0.5">
                          {completedLessonIds.includes(lesson.id) ? (
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
                            {lesson.duration || '—'}
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
          <Card className="min-h-[720px]">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {currentLessonData?.title || 'Counting from 1 to 10'}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {currentLessonData?.description || 'A short introduction to numbers one through ten with examples.'}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleLessonComplete}>
                  {currentLessonData?.id && completedLessonIds.includes(currentLessonData.id)
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
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="practice">Pronunciation Practice</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="video" className="m-0">
                  <div className="p-6">
                    <AspectRatio
                      ratio={16 / 9}
                      className="bg-muted rounded-md overflow-hidden"
                    >
                      {currentLessonData?.video_url ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${(currentLessonData.video_url as string).includes('youtube.com') ? (currentLessonData.video_url as string).split('v=')[1] : 'jzLAmPG22pE'}`}
                          title="Lesson Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/jzLAmPG22pE`}
                          title="Lesson Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      )}
                    </AspectRatio>
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentLesson((i) => Math.max(0, i - 1))}
                        disabled={currentLesson === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </Button>
                      <Button
                        onClick={() => setCurrentLesson((i) => Math.min(dbLessons.length - 1, i + 1))}
                        disabled={currentLesson >= dbLessons.length - 1}
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
                      {dbMaterials.map((material: any) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{material.title}</span>
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                          >
                            <a href={material.url} target="_blank" rel="noreferrer">
                              <Download className="h-4 w-4" />
                              Download
                            </a>
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
                        {transcriptToShow}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="m-0">
                  <div className="p-6 space-y-4 min-h-[calc(720px-65px)]">
                    <div className="flex gap-2">
                      <Button variant={practiceMode === 'script' ? 'default' : 'outline'} onClick={() => setPracticeMode('script')}>Part 1: Script Practice</Button>
                      <Button variant={practiceMode === 'open' ? 'default' : 'outline'} onClick={() => { setPracticeMode('open'); if (!flags.practiced_open) updateProgressFlag({ practiced_open: true }); }}>Part 2: Open Conversation</Button>
                    </div>

                    {practiceMode === 'script' ? (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Read the highlighted lines aloud. Then click Get Feedback.</p>
                        <div className="p-3 rounded border bg-muted/30 whitespace-pre-line max-h-56 overflow-auto">
                          {transcriptToShow}
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={startPractice} disabled={recording}>
                            {recording ? 'Listening...' : 'Start Recording'}
                          </Button>
                          <Button variant="outline" onClick={evaluatePractice} disabled={!recognizedText}>
                            Get Feedback
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm text-muted-foreground">Recognized</div>
                            <div className="p-3 rounded border bg-muted/30 min-h-[40px]">{recognizedText || '—'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Feedback</div>
                            <div className="p-3 rounded border bg-muted/30 min-h-[60px] whitespace-pre-line">{feedback || '—'}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Speak naturally about numbers, time, and money. Keep responses short and clear.</p>
                        <div className="border rounded-md">
                          <ConversationInterface
                            language="english"
                            topic="Numbers and Everyday Math"
                          />
                        </div>
                      </div>
                    )}
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