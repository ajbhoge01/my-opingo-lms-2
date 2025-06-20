"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, CheckCircle, AlertCircle, Play, Trophy, Target, BookOpen, Timer } from "lucide-react"
import Link from "next/link"

type Quiz = {
  id: string
  title: string
  description: string
  course: string
  duration: number // in minutes
  totalQuestions: number
  difficulty: "Easy" | "Medium" | "Hard"
  status: "available" | "completed" | "locked"
  score?: number
  maxScore: number
  attempts: number
  maxAttempts: number
  dueDate?: string
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [filter, setFilter] = useState<"all" | "available" | "completed">("all")

  useEffect(() => {
    // Mock quiz data
    const mockQuizzes: Quiz[] = [
      {
        id: "1",
        title: "React Hooks Fundamentals",
        description: "Test your knowledge of React Hooks including useState, useEffect, and custom hooks",
        course: "React Fundamentals",
        duration: 30,
        totalQuestions: 15,
        difficulty: "Medium",
        status: "available",
        maxScore: 100,
        attempts: 0,
        maxAttempts: 3,
        dueDate: "2024-01-20",
      },
      {
        id: "2",
        title: "JavaScript ES6+ Features",
        description: "Quiz covering arrow functions, destructuring, promises, and async/await",
        course: "JavaScript Basics",
        duration: 25,
        totalQuestions: 20,
        difficulty: "Easy",
        status: "completed",
        score: 85,
        maxScore: 100,
        attempts: 1,
        maxAttempts: 2,
      },
      {
        id: "3",
        title: "Advanced TypeScript",
        description: "Advanced concepts including generics, utility types, and decorators",
        course: "TypeScript Mastery",
        duration: 45,
        totalQuestions: 25,
        difficulty: "Hard",
        status: "locked",
        maxScore: 150,
        attempts: 0,
        maxAttempts: 2,
      },
      {
        id: "4",
        title: "CSS Grid & Flexbox",
        description: "Layout techniques using CSS Grid and Flexbox",
        course: "Web Design",
        duration: 20,
        totalQuestions: 12,
        difficulty: "Medium",
        status: "completed",
        score: 92,
        maxScore: 100,
        attempts: 2,
        maxAttempts: 3,
      },
    ]

    setQuizzes(mockQuizzes)
  }, [])

  const getDifficultyColor = (difficulty: Quiz["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: Quiz["status"]) => {
    switch (status) {
      case "available":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "locked":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredQuizzes = quizzes.filter((quiz) => filter === "all" || quiz.status === filter)

  const stats = {
    total: quizzes.length,
    available: quizzes.filter((q) => q.status === "available").length,
    completed: quizzes.filter((q) => q.status === "completed").length,
    averageScore: Math.round(
      quizzes.filter((q) => q.score !== undefined).reduce((acc, q) => acc + (q.score! / q.maxScore) * 100, 0) /
        quizzes.filter((q) => q.score !== undefined).length || 0,
    ),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quizzes & Assessments</h1>
          <p className="text-xl text-gray-600">Test your knowledge and track your learning progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Play className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {["all", "available", "completed"].map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption as typeof filter)}
                className="capitalize"
              >
                {filterOption}
              </Button>
            ))}
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                  <Badge className={getStatusColor(quiz.status)}>{quiz.status}</Badge>
                </div>

                <CardTitle className="text-xl line-clamp-2">{quiz.title}</CardTitle>
                <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{quiz.course}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer className="h-4 w-4" />
                    <span>{quiz.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{quiz.totalQuestions} questions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      {quiz.attempts}/{quiz.maxAttempts} attempts
                    </span>
                  </div>
                </div>

                {quiz.dueDate && (
                  <div className="flex items-center space-x-1 text-sm text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                  </div>
                )}

                {quiz.status === "completed" && quiz.score !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">
                        {quiz.score}/{quiz.maxScore}
                      </span>
                    </div>
                    <Progress value={(quiz.score / quiz.maxScore) * 100} className="h-2" />
                    <div className="text-center">
                      <span className="text-lg font-bold text-green-600">
                        {Math.round((quiz.score / quiz.maxScore) * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  {quiz.status === "available" && (
                    <Button className="w-full" asChild>
                      <Link href={`/quizzes/${quiz.id}/start`}>
                        <Play className="mr-2 h-4 w-4" />
                        Start Quiz
                      </Link>
                    </Button>
                  )}

                  {quiz.status === "completed" && (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/quizzes/${quiz.id}/results`}>
                          <Trophy className="mr-2 h-4 w-4" />
                          View Results
                        </Link>
                      </Button>
                      {quiz.attempts < quiz.maxAttempts && (
                        <Button className="w-full" asChild>
                          <Link href={`/quizzes/${quiz.id}/retake`}>
                            <Play className="mr-2 h-4 w-4" />
                            Retake Quiz
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}

                  {quiz.status === "locked" && (
                    <Button className="w-full" disabled>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Locked
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
              <p className="text-gray-600">
                {filter === "all" ? "No quizzes available at the moment." : `No ${filter} quizzes found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
