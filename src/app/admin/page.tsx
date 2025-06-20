"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  UserPlus,
  Upload,
  Settings,
  Bell,
  Calendar,
  FileText,
  BarChart3,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
} from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: "teacher" | "student" | "parent"
  status: "active" | "inactive" | "pending"
  lastActive: string
  courses?: number
  students?: number
}

type Course = {
  id: string
  title: string
  instructor: string
  students: number
  status: "published" | "draft" | "pending"
  progress: number
  lastUpdated: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "courses" | "content" | "reports">("overview")

  useEffect(() => {
    // Mock users data
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@school.edu",
        role: "teacher",
        status: "active",
        lastActive: "2024-01-15T14:30:00",
        courses: 5,
        students: 120,
      },
      {
        id: "2",
        name: "Prof. Michael Chen",
        email: "michael.chen@school.edu",
        role: "teacher",
        status: "active",
        lastActive: "2024-01-15T16:45:00",
        courses: 3,
        students: 85,
      },
      {
        id: "3",
        name: "Emma Wilson",
        email: "emma.wilson@student.edu",
        role: "student",
        status: "active",
        lastActive: "2024-01-15T18:20:00",
      },
      {
        id: "4",
        name: "John Smith",
        email: "john.smith@parent.edu",
        role: "parent",
        status: "active",
        lastActive: "2024-01-14T20:15:00",
      },
      {
        id: "5",
        name: "Lisa Davis",
        email: "lisa.davis@teacher.edu",
        role: "teacher",
        status: "pending",
        lastActive: "2024-01-13T12:30:00",
        courses: 0,
        students: 0,
      },
    ]

    // Mock courses data
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Mathematics Grade 8",
        instructor: "Dr. Sarah Johnson",
        students: 45,
        status: "published",
        progress: 85,
        lastUpdated: "2024-01-15T10:30:00",
      },
      {
        id: "2",
        title: "Science Grade 7",
        instructor: "Prof. Michael Chen",
        students: 38,
        status: "published",
        progress: 72,
        lastUpdated: "2024-01-14T15:20:00",
      },
      {
        id: "3",
        title: "English Literature",
        instructor: "Ms. Emily Brown",
        students: 52,
        status: "draft",
        progress: 45,
        lastUpdated: "2024-01-13T09:15:00",
      },
      {
        id: "4",
        title: "History Grade 9",
        instructor: "Mr. David Wilson",
        students: 0,
        status: "pending",
        progress: 20,
        lastUpdated: "2024-01-12T14:45:00",
      },
    ]

    setUsers(mockUsers)
    setCourses(mockCourses)
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "teacher":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-green-100 text-green-800"
      case "parent":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.status === "published").length,
    totalStudents: users.filter((u) => u.role === "student").length,
    totalTeachers: users.filter((u) => u.role === "teacher").length,
    pendingApprovals:
      users.filter((u) => u.status === "pending").length + courses.filter((c) => c.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="h-10 w-10 text-blue-600 mr-3" />
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage users, content, and monitor school activities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{stats.activeUsers} active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">{stats.publishedCourses} published</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Bulk Upload</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Create Course</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {["overview", "users", "courses", "content", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 text-blue-500 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New course published</p>
                    <p className="text-xs text-gray-600">Mathematics Grade 8 by Dr. Sarah Johnson</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New teacher registered</p>
                    <p className="text-xs text-gray-600">Lisa Davis - Pending approval</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Student achievement</p>
                    <p className="text-xs text-gray-600">Emma Wilson completed Science course</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-500 mr-2" />
                    Pending Approvals
                  </div>
                  <Badge variant="destructive">{stats.pendingApprovals}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Teacher Registration</h4>
                    <p className="text-sm text-gray-600">Lisa Davis</p>
                    <p className="text-xs text-orange-600">Pending for 2 days</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Course Review</h4>
                    <p className="text-sm text-gray-600">History Grade 9</p>
                    <p className="text-xs text-blue-600">Submitted for approval</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Performance</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Health</span>
                    <span className="text-green-600">Good</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="text-yellow-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span className="text-blue-600">
                      {stats.activeUsers}/{stats.totalUsers}
                    </span>
                  </div>
                  <Progress value={(stats.activeUsers / stats.totalUsers) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
                  Quick Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalTeachers}</div>
                    <div className="text-sm text-gray-600">Teachers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.publishedCourses}</div>
                    <div className="text-sm text-gray-600">Published Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-2">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        {user.role === "teacher" && (
                          <div className="text-sm text-gray-600">
                            <div>{user.courses} courses</div>
                            <div>{user.students} students</div>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Last active: {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <div className="flex space-x-2">
                <Button>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Content
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>by {course.instructor}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{course.students} students enrolled</span>
                      <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <div className="flex space-x-2">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Content
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Content Library
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Files</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Videos</span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Documents</span>
                    <span className="font-medium">658</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Images</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Used</span>
                      <span>15.2 GB / 50 GB</span>
                    </div>
                    <Progress value={30.4} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Math_Chapter_5.pdf</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Science_Lab_Video.mp4</p>
                      <p className="text-xs text-gray-600">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">History_Timeline.pptx</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Approval</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 border border-orange-200 bg-orange-50 rounded">
                    <div>
                      <p className="text-sm font-medium">English_Essay_Guide.pdf</p>
                      <p className="text-xs text-gray-600">Pending review</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-blue-200 bg-blue-50 rounded">
                    <div>
                      <p className="text-sm font-medium">Chemistry_Experiment.mp4</p>
                      <p className="text-xs text-gray-600">Needs revision</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reports & Analytics</h2>
              <div className="flex space-x-2">
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Excellent (90-100%)</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Good (80-89%)</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Average (70-79%)</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Below Average (&lt;70%)</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">92%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Session Time</span>
                      <span className="font-medium">45 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Course Completions</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Peak Hours</span>
                      <span className="font-medium">2-4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mobile Usage</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Desktop Usage</span>
                      <span className="font-medium">32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
