"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, MessageSquare, School, BarChart3, Award, User } from "lucide-react"
import Link from "next/link"

export default function ChildrenPage() {
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
          <p className="text-gray-600">Loading children profiles...</p>
        </div>
      </div>
    )
  }

  const children = [
    {
      id: 1,
      name: "Aanya Singh",
      grade: "8",
      section: "A",
      age: 13,
      subjects: [
        { name: "Mathematics", grade: "A", percentage: 92 },
        { name: "Science", grade: "A-", percentage: 85 },
        { name: "English", grade: "B+", percentage: 78 },
        { name: "Social Studies", grade: "A", percentage: 90 },
        { name: "Hindi", grade: "A-", percentage: 87 },
      ],
      attendance: 98,
      activities: ["Debate Club", "Science Olympiad", "Basketball"],
      achievements: [
        { title: "Science Quiz Winner", date: "May 15, 2025" },
        { title: "Perfect Attendance Award", date: "April 2025" },
      ],
      upcomingAssignments: [
        { title: "Math Project", due: "June 20, 2025", status: "pending" },
        { title: "Science Lab Report", due: "June 15, 2025", status: "pending" },
      ],
      teacherNotes: [
        { teacher: "Mrs. Sharma", note: "Excellent participation in class discussions", date: "June 5, 2025" },
        { teacher: "Mr. Patel", note: "Shows great aptitude for mathematics", date: "May 28, 2025" },
      ],
    },
    {
      id: 2,
      name: "Arjun Singh",
      grade: "5",
      section: "B",
      age: 10,
      subjects: [
        { name: "Mathematics", grade: "A-", percentage: 88 },
        { name: "Science", grade: "A", percentage: 90 },
        { name: "English", grade: "B+", percentage: 82 },
        { name: "Social Studies", grade: "B+", percentage: 84 },
        { name: "Hindi", grade: "A", percentage: 91 },
      ],
      attendance: 95,
      activities: ["Art Club", "Cricket Team", "Coding Class"],
      achievements: [
        { title: "Best Art Project", date: "May 22, 2025" },
        { title: "Reading Challenge Winner", date: "March 2025" },
      ],
      upcomingAssignments: [
        { title: "English Essay", due: "June 18, 2025", status: "pending" },
        { title: "History Project", due: "June 25, 2025", status: "pending" },
      ],
      teacherNotes: [
        { teacher: "Mrs. Gupta", note: "Very creative in art projects", date: "June 8, 2025" },
        { teacher: "Mr. Singh", note: "Needs to focus more during reading time", date: "May 30, 2025" },
      ],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Children Profiles</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your children's academic progress</p>
        </div>

        {/* Children Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {children.map((child) => (
            <Card key={child.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <CardDescription className="text-blue-100">
                      Grade {child.grade} - Section {child.section} • Age {child.age}
                    </CardDescription>
                  </div>
                  <div className="bg-white rounded-full p-3">
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Academic Performance */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Academic Performance</h3>
                  <div className="space-y-3">
                    {child.subjects.map((subject, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject.name}</span>
                          <span className="font-medium">
                            {subject.grade} ({subject.percentage}%)
                          </span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Attendance</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">{child.attendance}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Present: {child.attendance}% of school days</p>
                      <p className="text-sm text-gray-600">Absent: {100 - child.attendance}% of school days</p>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Extracurricular Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {child.activities.map((activity, idx) => (
                      <Badge key={idx} variant="secondary">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Recent Achievements</h3>
                  <div className="space-y-2">
                    {child.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Assignments */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Upcoming Assignments</h3>
                  <div className="space-y-2">
                    {child.upcomingAssignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{assignment.title}</p>
                          <p className="text-xs text-gray-500">Due: {assignment.due}</p>
                        </div>
                        <Badge variant={assignment.status === "completed" ? "success" : "outline"}>
                          {assignment.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher Notes */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Teacher Notes</h3>
                  <div className="space-y-3">
                    {child.teacherNotes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{note.teacher}</p>
                          <p className="text-xs text-gray-500">{note.date}</p>
                        </div>
                        <p className="text-sm">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/messages?teacher=true&student=${child.name}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Teacher
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/children/${child.id}`}>View Full Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Parent Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Parent Actions</CardTitle>
            <CardDescription>Manage your children's education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/parent-teacher">
                <School className="mr-2 h-4 w-4" />
                Schedule Parent-Teacher Meeting
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/attendance">
                <Calendar className="mr-2 h-4 w-4" />
                View Detailed Attendance Records
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/progress">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Progress Reports
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message All Teachers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
