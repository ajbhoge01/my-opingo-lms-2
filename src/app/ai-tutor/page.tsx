"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import {
  Brain,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Target,
  Lightbulb,
  Clock,
  Star,
  Send,
  Mic,
  Volume2,
} from "lucide-react"

type LearningPath = {
  id: string
  title: string
  description: string
  progress: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  topics: string[]
}

type ChatMessage = {
  id: string
  sender: "user" | "ai"
  content: string
  timestamp: string
  type: "text" | "recommendation" | "quiz"
}

export default function AITutorPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "paths" | "recommendations">("chat")

  useEffect(() => {
    // Mock learning paths
    const mockPaths: LearningPath[] = [
      {
        id: "1",
        title: "React Mastery Path",
        description: "Personalized learning path based on your current React knowledge",
        progress: 65,
        difficulty: "Intermediate",
        estimatedTime: "4 weeks",
        topics: ["Hooks", "Context API", "Performance Optimization", "Testing"],
      },
      {
        id: "2",
        title: "JavaScript Fundamentals",
        description: "Strengthen your JavaScript foundation with targeted exercises",
        progress: 30,
        difficulty: "Beginner",
        estimatedTime: "3 weeks",
        topics: ["Variables", "Functions", "Objects", "Arrays", "Async Programming"],
      },
      {
        id: "3",
        title: "Advanced TypeScript",
        description: "Master advanced TypeScript concepts and patterns",
        progress: 10,
        difficulty: "Advanced",
        estimatedTime: "6 weeks",
        topics: ["Generics", "Utility Types", "Decorators", "Module System"],
      },
    ]

    // Mock chat messages
    const mockMessages: ChatMessage[] = [
      {
        id: "1",
        sender: "ai",
        content:
          "Hello! I'm your AI tutor. I've analyzed your learning progress and I'm here to help you succeed. What would you like to work on today?",
        timestamp: "2024-01-15T10:00:00",
        type: "text",
      },
      {
        id: "2",
        sender: "user",
        content: "I'm struggling with React hooks. Can you help me understand useEffect better?",
        timestamp: "2024-01-15T10:01:00",
        type: "text",
      },
      {
        id: "3",
        sender: "ai",
        content:
          "Great question! useEffect is one of the most important hooks. Let me break it down for you with some examples. Would you like me to create a personalized lesson plan for useEffect?",
        timestamp: "2024-01-15T10:01:30",
        type: "recommendation",
      },
    ]

    setLearningPaths(mockPaths)
    setChatMessages(mockMessages)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: "text",
      }

      setChatMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          content:
            "I understand your question. Let me provide you with a detailed explanation and some practice exercises tailored to your learning style.",
          timestamp: new Date().toISOString(),
          type: "text",
        }
        setChatMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Implement voice recognition here
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-10 w-10 text-blue-600 mr-3" />
            AI Digital Tutor
          </h1>
          <p className="text-xl text-gray-600">
            Your personalized learning companion powered by artificial intelligence
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Paths</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningPaths.length}</div>
              <p className="text-xs text-muted-foreground">Personalized for you</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(learningPaths.reduce((acc, path) => acc + path.progress, 0) / learningPaths.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Across all paths</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">2.5h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{chatMessages.length}</div>
              <p className="text-xs text-muted-foreground">Total conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {["chat", "paths", "recommendations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "chat" && <MessageSquare className="h-4 w-4 mr-2 inline" />}
                {tab === "paths" && <Target className="h-4 w-4 mr-2 inline" />}
                {tab === "recommendations" && <Lightbulb className="h-4 w-4 mr-2 inline" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-600" />
                    AI Tutor Chat
                  </CardTitle>
                  <CardDescription>Ask questions, get explanations, and receive personalized guidance</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask your AI tutor anything..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleVoiceInput}
                      variant="outline"
                      size="sm"
                      className={isListening ? "bg-red-100 text-red-600" : ""}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Get Study Recommendations
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explain a Concept
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Create Practice Quiz
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analyze My Progress
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Voice Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen to Explanations
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "paths" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Personalized Learning Paths</h2>
              <Button>
                <Target className="h-4 w-4 mr-2" />
                Create New Path
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getDifficultyColor(path.difficulty)}>{path.difficulty}</Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{path.estimatedTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">AI Recommendations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    Today's Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">React useEffect Hook</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on your recent quiz results, I recommend spending 30 minutes reviewing useEffect patterns.
                  </p>
                  <Button size="sm">Start Learning</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    Weak Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Async/Await Concepts</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your recent assignments show some confusion with async programming. Let's practice!
                  </p>
                  <Button size="sm">Practice Now</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                    Next Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Advanced TypeScript</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You're ready for the next level! Start with generics and utility types.
                  </p>
                  <Button size="sm">Begin Challenge</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 text-purple-500 mr-2" />
                    Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Weekly Goals</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete 3 React exercises and 2 JavaScript quizzes this week.
                  </p>
                  <Button size="sm">View Full Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
