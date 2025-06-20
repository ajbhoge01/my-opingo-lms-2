"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, FileText, MessageSquare, School, UserPlus, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function ParentDashboardPage() {
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
          <p className="text-gray-600">Loading parent dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome, Parent {user}!</h1>
          <p className="text-orange-100">Monitor your child's educational progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Children</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">Total enrolled courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">Average attendance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Grade</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A-</div>
              <p className="text-xs text-muted-foreground">Current semester</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Children Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Progress</CardTitle>
              <CardDescription>Monitor academic performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Aanya Singh</h4>
                    <p className="text-sm text-muted-foreground">Grade 8 - Section A</p>
                  </div>
                  <Badge variant="outline">View Details</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>English</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Arjun Singh</h4>
                    <p className="text-sm text-muted-foreground">Grade 5 - Section B</p>
                  </div>
                  <Badge variant="outline">View Details</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>English</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Parent Actions</CardTitle>
              <CardDescription>Manage your children's education</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/children">
                  <UserPlus className="mr-2 h-4 w-4" />
                  View Children's Profiles
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/parent-teacher">
                  <School className="mr-2 h-4 w-4" />
                  Schedule Parent-Teacher Meeting
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/attendance">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Attendance Records
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Teachers
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>School Calendar</CardTitle>
            <CardDescription>Important dates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="bg-red-100 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Parent-Teacher Conference</h4>
                  <p className="text-sm text-muted-foreground">Next Monday, 4:00 PM - 6:00 PM</p>
                </div>
                <Badge>Important</Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <School className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Science Exhibition</h4>
                  <p className="text-sm text-muted-foreground">Saturday, 10:00 AM - 2:00 PM</p>
                </div>
                <Badge variant="outline">School Event</Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Term Exam Results</h4>
                  <p className="text-sm text-muted-foreground">Next Friday</p>
                </div>
                <Badge variant="outline">Academic</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Child Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Compare your children's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">Mathematics</h4>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Aanya</div>
                  <div className="flex-1">
                    <Progress value={92} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">92%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Arjun</div>
                  <div className="flex-1">
                    <Progress value={88} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">88%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Class Avg.</div>
                  <div className="flex-1">
                    <Progress value={76} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">76%</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Science</h4>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Aanya</div>
                  <div className="flex-1">
                    <Progress value={85} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">85%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Arjun</div>
                  <div className="flex-1">
                    <Progress value={90} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">90%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Class Avg.</div>
                  <div className="flex-1">
                    <Progress value={72} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">72%</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">English</h4>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Aanya</div>
                  <div className="flex-1">
                    <Progress value={78} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">78%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Arjun</div>
                  <div className="flex-1">
                    <Progress value={82} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">82%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm">Class Avg.</div>
                  <div className="flex-1">
                    <Progress value={75} className="h-3 bg-gray-100" />
                  </div>
                  <div className="w-10 text-sm font-medium">75%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
