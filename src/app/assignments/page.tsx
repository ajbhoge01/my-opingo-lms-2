"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Calendar, Clock, CheckCircle, AlertCircle, Download, Eye, Edit } from "lucide-react"
import Link from "next/link"

type Assignment = {
  id: string
  title: string
  description: string
  dueDate: string
  course: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: number
  maxGrade: number
  submissionDate?: string
  feedback?: string
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [role, setRole] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded">("all")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role"))
    }

    // Mock assignments data
    const mockAssignments: Assignment[] = [
      {
        id: "1",
        title: "React Components Assignment",
        description: "Create a set of reusable React components with proper TypeScript types",
        dueDate: "2024-01-15",
        course: "React Fundamentals",
        status: "pending",
        maxGrade: 100,
      },
      {
        id: "2",
        title: "JavaScript Functions Quiz",
        description: "Complete the quiz on JavaScript functions and closures",
        dueDate: "2024-01-10",
        course: "JavaScript Basics",
        status: "submitted",
        maxGrade: 50,
        submissionDate: "2024-01-09",
      },
      {
        id: "3",
        title: "Database Design Project",
        description: "Design a normalized database schema for an e-commerce application",
        dueDate: "2024-01-20",
        course: "Database Systems",
        status: "graded",
        grade: 85,
        maxGrade: 100,
        submissionDate: "2024-01-18",
        feedback: "Good work! Consider adding more indexes for better performance.",
      },
      {
        id: "4",
        title: "CSS Flexbox Layout",
        description: "Create responsive layouts using CSS Flexbox",
        dueDate: "2024-01-05",
        course: "Web Design",
        status: "overdue",
        maxGrade: 75,
      },
    ]

    setAssignments(mockAssignments)
  }, [])

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "graded":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "submitted":
        return <Upload className="h-4 w-4" />
      case "graded":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredAssignments = assignments.filter((assignment) => filter === "all" || assignment.status === filter)

  const stats = {
    total: assignments.length,
    pending: assignments.filter((a) => a.status === "pending").length,
    submitted: assignments.filter((a) => a.status === "submitted").length,
    graded: assignments.filter((a) => a.status === "graded").length,
    overdue: assignments.filter((a) => a.status === "overdue").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {role === "teacher" ? "Assignment Management" : "My Assignments"}
          </h1>
          <p className="text-xl text-gray-600">
            {role === "teacher" ? "Manage and review student assignments" : "Track your assignments and submissions"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <Upload className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.graded}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {["all", "pending", "submitted", "graded"].map((filterOption) => (
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

        {/* Assignments List */}
        <div className="space-y-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <Badge className={getStatusColor(assignment.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(assignment.status)}
                          <span className="capitalize">{assignment.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <CardDescription className="text-base mb-2">{assignment.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{assignment.course}</span>
                      </div>
                    </div>
                  </div>

                  {assignment.status === "graded" && assignment.grade !== undefined && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {assignment.grade}/{assignment.maxGrade}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((assignment.grade / assignment.maxGrade) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {assignment.status === "graded" && assignment.grade !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Grade Progress</span>
                      <span>
                        {assignment.grade}/{assignment.maxGrade}
                      </span>
                    </div>
                    <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-2" />
                  </div>
                )}

                {assignment.feedback && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Teacher Feedback:</h4>
                    <p className="text-blue-800 text-sm">{assignment.feedback}</p>
                  </div>
                )}

                {assignment.submissionDate && (
                  <div className="mb-4 text-sm text-gray-600">
                    <span>Submitted on: {new Date(assignment.submissionDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex space-x-2">
                  {assignment.status === "pending" && (
                    <Button asChild>
                      <Link href={`/assignments/${assignment.id}/submit`}>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Link>
                    </Button>
                  )}

                  {assignment.status === "submitted" && role === "student" && (
                    <Button variant="outline" disabled>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Submitted
                    </Button>
                  )}

                  {role === "teacher" && (
                    <>
                      <Button asChild>
                        <Link href={`/assignments/${assignment.id}/review`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Review Submissions
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/assignments/${assignment.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Assignment
                        </Link>
                      </Button>
                    </>
                  )}

                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-600">
                {filter === "all" ? "No assignments available at the moment." : `No ${filter} assignments found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
