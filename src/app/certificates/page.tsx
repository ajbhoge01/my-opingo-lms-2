"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share, Calendar, CheckCircle, Trophy, Medal } from "lucide-react"

type Certificate = {
  id: string
  title: string
  course: string
  issueDate: string
  expiryDate?: string
  grade: number
  maxGrade: number
  instructor: string
  certificateNumber: string
  status: "active" | "expired" | "revoked"
  skills: string[]
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])

  useEffect(() => {
    // Mock certificates data
    const mockCertificates: Certificate[] = [
      {
        id: "1",
        title: "React Development Mastery",
        course: "React Fundamentals",
        issueDate: "2024-01-15",
        grade: 92,
        maxGrade: 100,
        instructor: "Dr. Sarah Johnson",
        certificateNumber: "CERT-2024-001",
        status: "active",
        skills: ["React", "JavaScript", "Component Design", "State Management"],
      },
      {
        id: "2",
        title: "JavaScript Expert",
        course: "JavaScript Basics",
        issueDate: "2023-12-20",
        expiryDate: "2025-12-20",
        grade: 88,
        maxGrade: 100,
        instructor: "Prof. Michael Chen",
        certificateNumber: "CERT-2023-045",
        status: "active",
        skills: ["JavaScript", "ES6+", "Async Programming", "DOM Manipulation"],
      },
      {
        id: "3",
        title: "Database Design Professional",
        course: "Database Systems",
        issueDate: "2023-11-10",
        grade: 95,
        maxGrade: 100,
        instructor: "Dr. Emily Rodriguez",
        certificateNumber: "CERT-2023-032",
        status: "active",
        skills: ["SQL", "Database Design", "Normalization", "Query Optimization"],
      },
      {
        id: "4",
        title: "Web Design Fundamentals",
        course: "Web Design",
        issueDate: "2023-10-05",
        expiryDate: "2023-10-05",
        grade: 78,
        maxGrade: 100,
        instructor: "Ms. Lisa Wang",
        certificateNumber: "CERT-2023-018",
        status: "expired",
        skills: ["CSS", "HTML", "Responsive Design", "UI/UX"],
      },
    ]

    setCertificates(mockCertificates)
  }, [])

  const getStatusColor = (status: Certificate["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "revoked":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const stats = {
    total: certificates.length,
    active: certificates.filter((c) => c.status === "active").length,
    expired: certificates.filter((c) => c.status === "expired").length,
    averageGrade: Math.round(
      certificates.reduce((acc, cert) => acc + (cert.grade / cert.maxGrade) * 100, 0) / certificates.length,
    ),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Certificates</h1>
          <p className="text-xl text-gray-600">Your achievements and professional certifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
              <Calendar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.averageGrade}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((certificate) => {
            const percentage = Math.round((certificate.grade / certificate.maxGrade) * 100)

            return (
              <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Medal className="h-6 w-6" />
                        <Badge className={getStatusColor(certificate.status)}>{certificate.status}</Badge>
                      </div>
                      <CardTitle className="text-xl text-white">{certificate.title}</CardTitle>
                      <CardDescription className="text-blue-100">{certificate.course}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getGradeColor(percentage)} bg-white px-2 py-1 rounded`}>
                        {percentage}%
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Instructor:</span>
                      <p className="font-medium">{certificate.instructor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Issue Date:</span>
                      <p className="font-medium">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Certificate #:</span>
                      <p className="font-medium text-xs">{certificate.certificateNumber}</p>
                    </div>
                    {certificate.expiryDate && (
                      <div>
                        <span className="text-gray-600">Expires:</span>
                        <p className="font-medium">{new Date(certificate.expiryDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-gray-600 text-sm">Skills Acquired:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  {certificate.status === "expired" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                        <span className="text-red-800 text-sm font-medium">This certificate has expired</span>
                      </div>
                      <p className="text-red-700 text-xs mt-1">
                        Consider retaking the course to renew your certification
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {certificates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
              <p className="text-gray-600 mb-4">Complete courses to earn your first certificate</p>
              <Button asChild>
                <a href="/courses">Browse Courses</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
