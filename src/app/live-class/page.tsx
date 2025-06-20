"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Calendar, Clock, Users, Mic, Settings, Share, RepeatIcon as Record } from "lucide-react"

type LiveClass = {
  id: string
  title: string
  instructor: string
  course: string
  scheduledTime: string
  duration: number
  status: "upcoming" | "live" | "ended"
  participants: number
  maxParticipants: number
  description: string
  meetingLink?: string
}

export default function LiveClassPage() {
  const [classes, setClasses] = useState<LiveClass[]>([])
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role"))
    }

    // Mock live classes data
    const mockClasses: LiveClass[] = [
      {
        id: "1",
        title: "Advanced React Patterns",
        instructor: "Dr. Sarah Johnson",
        course: "React Fundamentals",
        scheduledTime: "2024-01-15T15:00:00",
        duration: 90,
        status: "upcoming",
        participants: 0,
        maxParticipants: 50,
        description:
          "Deep dive into advanced React patterns including render props, higher-order components, and compound components.",
        meetingLink: "https://meet.google.com/abc-defg-hij",
      },
      {
        id: "2",
        title: "JavaScript Async Programming",
        instructor: "Prof. Michael Chen",
        course: "JavaScript Basics",
        scheduledTime: "2024-01-14T14:00:00",
        duration: 60,
        status: "live",
        participants: 32,
        maxParticipants: 40,
        description: "Understanding promises, async/await, and handling asynchronous operations in JavaScript.",
        meetingLink: "https://zoom.us/j/123456789",
      },
      {
        id: "3",
        title: "Database Optimization Techniques",
        instructor: "Dr. Emily Rodriguez",
        course: "Database Systems",
        scheduledTime: "2024-01-13T16:30:00",
        duration: 75,
        status: "ended",
        participants: 28,
        maxParticipants: 35,
        description: "Learn advanced techniques for optimizing database queries and improving performance.",
      },
      {
        id: "4",
        title: "CSS Grid Masterclass",
        instructor: "Ms. Lisa Wang",
        course: "Web Design",
        scheduledTime: "2024-01-16T10:00:00",
        duration: 120,
        status: "upcoming",
        participants: 0,
        maxParticipants: 30,
        description: "Master CSS Grid layout system with practical examples and real-world projects.",
        meetingLink: "https://teams.microsoft.com/l/meetup-join/xyz",
      },
    ]

    setClasses(mockClasses)
  }, [])

  const getStatusColor = (status: LiveClass["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "live":
        return "bg-green-100 text-green-800 animate-pulse"
      case "ended":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const upcomingClasses = classes.filter((c) => c.status === "upcoming")
  const liveClasses = classes.filter((c) => c.status === "live")
  const endedClasses = classes.filter((c) => c.status === "ended")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Classes</h1>
          <p className="text-xl text-gray-600">
            {role === "teacher"
              ? "Manage and host your live sessions"
              : "Join interactive live sessions with your instructors"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Now</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{liveClasses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingClasses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{endedClasses.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Classes Section */}
        {liveClasses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2" />
              Live Now
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveClasses.map((liveClass) => {
                const { date, time } = formatDateTime(liveClass.scheduledTime)

                return (
                  <Card key={liveClass.id} className="border-green-200 bg-green-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(liveClass.status)}>🔴 LIVE</Badge>
                            <Badge variant="outline">{liveClass.course}</Badge>
                          </div>
                          <CardTitle className="text-xl">{liveClass.title}</CardTitle>
                          <CardDescription>Instructor: {liveClass.instructor}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{liveClass.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {time} ({liveClass.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>
                            {liveClass.participants}/{liveClass.maxParticipants}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          <Video className="mr-2 h-4 w-4" />
                          Join Live Class
                        </Button>
                        {role === "teacher" && (
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {role === "teacher" && (
                        <div className="flex space-x-2 pt-2 border-t">
                          <Button variant="outline" size="sm">
                            <Mic className="mr-2 h-4 w-4" />
                            Mute All
                          </Button>
                          <Button variant="outline" size="sm">
                            <Record className="mr-2 h-4 w-4" />
                            Record
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="mr-2 h-4 w-4" />
                            Share Screen
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Upcoming Classes Section */}
        {upcomingClasses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingClasses.map((upcomingClass) => {
                const { date, time } = formatDateTime(upcomingClass.scheduledTime)

                return (
                  <Card key={upcomingClass.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(upcomingClass.status)}>Upcoming</Badge>
                            <Badge variant="outline">{upcomingClass.course}</Badge>
                          </div>
                          <CardTitle className="text-xl">{upcomingClass.title}</CardTitle>
                          <CardDescription>Instructor: {upcomingClass.instructor}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{upcomingClass.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {time} ({upcomingClass.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>Max {upcomingClass.maxParticipants} participants</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                        {role === "teacher" && (
                          <Button className="flex-1">
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Class
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Past Classes Section */}
        {endedClasses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Classes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {endedClasses.map((endedClass) => {
                const { date, time } = formatDateTime(endedClass.scheduledTime)

                return (
                  <Card key={endedClass.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(endedClass.status)}>Ended</Badge>
                            <Badge variant="outline">{endedClass.course}</Badge>
                          </div>
                          <CardTitle className="text-xl">{endedClass.title}</CardTitle>
                          <CardDescription>Instructor: {endedClass.instructor}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {time} ({endedClass.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{endedClass.participants} attended</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Watch Recording
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {classes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No live classes scheduled</h3>
              <p className="text-gray-600 mb-4">
                {role === "teacher"
                  ? "Create your first live class to engage with students"
                  : "Check back later for upcoming live sessions"}
              </p>
              {role === "teacher" && (
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  Schedule New Class
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
