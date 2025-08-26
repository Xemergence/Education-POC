import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Award, BookOpen, Check, Clock, Mic, Star } from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color: string;
}

interface VocabularyData {
  word: string;
  mastery: number;
  usageCount: number;
}

interface SessionData {
  date: string;
  fluency: number;
  accuracy: number;
  vocabulary: number;
}

interface PerformanceSummaryProps {
  metrics?: PerformanceMetric[];
  vocabularyData?: VocabularyData[];
  sessionHistory?: SessionData[];
  language?: string;
  sessionDuration?: number;
  completedExercises?: number;
  masteredPhrases?: string[];
  improvementAreas?: string[];
}

const PerformanceSummary = ({
  metrics = [
    {
      name: "Fluency",
      value: 78,
      max: 100,
      icon: <Mic className="h-4 w-4" />,
      color: "text-blue-500",
    },
    {
      name: "Vocabulary",
      value: 65,
      max: 100,
      icon: <BookOpen className="h-4 w-4" />,
      color: "text-green-500",
    },
    {
      name: "Grammar",
      value: 82,
      max: 100,
      icon: <Check className="h-4 w-4" />,
      color: "text-purple-500",
    },
    {
      name: "Pronunciation",
      value: 70,
      max: 100,
      icon: <Mic className="h-4 w-4" />,
      color: "text-orange-500",
    },
  ],
  vocabularyData = [
    { word: "Conversation", mastery: 90, usageCount: 12 },
    { word: "Practice", mastery: 85, usageCount: 10 },
    { word: "Language", mastery: 95, usageCount: 15 },
    { word: "Learning", mastery: 80, usageCount: 8 },
    { word: "Fluency", mastery: 70, usageCount: 6 },
  ],
  sessionHistory = [
    { date: "Mon", fluency: 65, accuracy: 70, vocabulary: 60 },
    { date: "Tue", fluency: 68, accuracy: 72, vocabulary: 63 },
    { date: "Wed", fluency: 70, accuracy: 75, vocabulary: 65 },
    { date: "Thu", fluency: 73, accuracy: 78, vocabulary: 68 },
    { date: "Fri", fluency: 75, accuracy: 80, vocabulary: 70 },
    { date: "Sat", fluency: 78, accuracy: 82, vocabulary: 73 },
    { date: "Sun", fluency: 80, accuracy: 85, vocabulary: 75 },
  ],
  language = "English",
  sessionDuration = 25,
  completedExercises = 12,
  masteredPhrases = [
    "How are you?",
    "I would like to practice English",
    "Could you speak more slowly?",
    "I am learning English",
  ],
  improvementAreas = [
    "Pronouncing numbers 1–10",
    "Basic question forms",
    "Everyday expressions",
  ],
}: PerformanceSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Performance Summary
        </h2>
        <p className="text-gray-600">
          {language} Conversation Practice Session
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Session Duration</p>
              <p className="text-xl font-bold">{sessionDuration} minutes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Exercises Completed</p>
              <p className="text-xl font-bold">{completedExercises}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Score</p>
              <p className="text-xl font-bold">
                {Math.round(
                  metrics.reduce((acc, metric) => acc + metric.value, 0) /
                    metrics.length,
                )}
                %
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Mastered Phrases</p>
              <p className="text-xl font-bold">{masteredPhrases.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Your performance across different language skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`mr-2 ${metric.color}`}>
                          {metric.icon}
                        </span>
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <span className="text-sm font-bold">{metric.value}%</span>
                    </div>
                    <Progress
                      value={metric.value}
                      max={metric.max}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vocabulary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vocabulary Mastery</CardTitle>
              <CardDescription>
                Words and phrases you used during the session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vocabularyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mastery" fill="#8884d8" name="Mastery %" />
                    <Bar
                      dataKey="usageCount"
                      fill="#82ca9d"
                      name="Usage Count"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                <h4 className="font-medium">Mastered Phrases</h4>
                <div className="flex flex-wrap gap-2">
                  {masteredPhrases.map((phrase, index) => (
                    <Badge key={index} variant="secondary">
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>
                Your progress over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="fluency"
                      stroke="#8884d8"
                      name="Fluency"
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#82ca9d"
                      name="Accuracy"
                    />
                    <Line
                      type="monotone"
                      dataKey="vocabulary"
                      stroke="#ffc658"
                      name="Vocabulary"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Improvement Areas</CardTitle>
              <CardDescription>
                Focus on these areas to improve your language skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {improvementAreas.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Recommended Practice</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-1">Grammar Exercises</h5>
                      <p className="text-sm text-gray-600">
                        Focus on past tense and subjunctive mood
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-1">
                        Conversation Practice
                      </h5>
                      <p className="text-sm text-gray-600">
                        Practice with idiomatic expressions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceSummary;