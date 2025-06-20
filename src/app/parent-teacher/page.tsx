"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MessageSquare, School, User, CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function ParentTeacherPage() {
  const [role, setRole] = useState<string | null>(null)
  const [user, setUser] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      try {
        const savedRole = localStorage.getItem("role")
        const savedUser = localStorage.getItem("user")

        if (!savedRole || !savedUser) {
          router.push("/login")
        } else if (savedRole !== "parent") {
          router.push("/dashboard")
        } else {
          setRole(savedRole)
          setUser(savedUser)
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error)
        router.push("/login")
      }
    }
  }, [router, mounted])

  if (!mounted || !role || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parent-teacher page...</p>
        </div>
      </div>
    )
  }

  const teachers = [
    {
      id: 1,
      name: "Mrs. Sharma",
      subject: "Mathematics",
      student: "Aanya Singh",
      grade: "8",
      section: "A",
      availableTimes: [
        { day: "Monday", slots: ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"] },
        { day: "Wednesday", slots: ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"] },
        { day: "Friday", slots: ["3:30 PM - 4:00 PM", "4:30 PM - 5:00 PM"] },
      ],
    },
    {
      id: 2,
      name: "Mr. Patel",
      subject: "Science",
      student: "Aanya Singh",
      grade: "8",
      section: "A",
      availableTimes: [
        { day: "Tuesday", slots: ["3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"] },
        { day: "Thursday", slots: ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"] },
      ],
    },
    {
      id: 3,
      name: "Mrs. Gupta",
      subject: "English",
      student: "Arjun Singh",
      grade: "5",
      section: "B",
      availableTimes: [
        { day: "Monday", slots: ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"] },
        { day: "Wednesday", slots: ["3:30 PM - 4:00 PM", "4:30 PM - 5:00 PM"] },
      ],
    },
    {
      id: 4,
      name: "Mr. Singh",
      subject: "Hindi",
      student: "Arjun Singh",
      grade: "5",
      section: "B",
      availableTimes: [
        { day: "Tuesday", slots: ["2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM"] },
        { day: "Thursday", slots: ["3:30 PM - 4:00 PM", "4:30 PM - 5:00 PM"] },
      ],
    },
  ]

  const upcomingMeetings = [
    {
      id: 1,
      teacher: "Mrs. Sharma",
      subject: "Mathematics",
      student: "Aanya Singh",
      date: "June 15, 2025",
      time: "3:00 PM - 3:30 PM",
      status: "confirmed",
    },
    {
      id: 2,
      teacher: "Mr. Singh",
      subject: "Hindi",
      student: "Arjun Singh",
      date: "June 18, 2025",
      time: "2:00 PM - 2:30 PM",
      status: "pending",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parent-Teacher Meetings</h1>
          <p className="text-gray-600 mt-2">Schedule and manage meetings with your children's teachers</p>
        </div>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your scheduled parent-teacher conferences</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length > 0 ? (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <School className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{meeting.teacher}</h4>
                        <Badge className="ml-2" variant={meeting.status === "confirmed" ? "default" : "outline"}>
                          {meeting.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {meeting.subject} • {meeting.student}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{meeting.date}</span>
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        <span>{meeting.time}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/messages?teacher=${meeting.teacher}`}>
                          <MessageSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                      {meeting.status === "confirmed" ? (
                        <Button size="sm" variant="destructive">
                          Cancel
                        </Button>
                      ) : (
                        <div className="flex space-x-1">
                          <Button size="sm" variant="default" className="px-2">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" className="px-2">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <School className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No upcoming meetings</h3>
                <p className="text-gray-500 mt-1">Schedule a meeting with your child's teacher below</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule New Meeting */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Meeting</CardTitle>
            <CardDescription>Select a teacher to schedule a parent-teacher conference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                        <CardDescription>
                          {teacher.subject} • {teacher.student} (Grade {teacher.grade}-{teacher.section})
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Available Time Slots:</h4>
                    <div className="space-y-3">
                      {teacher.availableTimes.map((time, idx) => (
                        <div key={idx}>
                          <p className="text-sm font-medium text-gray-700">{time.day}</p>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {time.slots.map((slot, slotIdx) => (
                              <Button key={slotIdx} variant="outline" size="sm" className="text-xs justify-start">
                                <Clock className="h-3 w-3 mr-1" />
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/messages?teacher=${teacher.name}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                    <Button size="sm">Schedule Meeting</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meeting Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Parent-Teacher Meeting Guidelines</CardTitle>
            <CardDescription>Tips for a productive parent-teacher conference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Prepare Questions</h4>
                  <p className="text-sm text-gray-600">
                    Make a list of questions or concerns you want to discuss with the teacher.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Be On Time</h4>
                  <p className="text-sm text-gray-600">
                    Teachers have a tight schedule. Arrive 5 minutes before your appointment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Share Insights</h4>
                  <p className="text-sm text-gray-600">
                    Provide information about your child's home study habits, interests, and challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Follow Up</h4>
                  <p className="text-sm text-gray-600">
                    After the meeting, discuss the feedback with your child and implement any suggested strategies.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
