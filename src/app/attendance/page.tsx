"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle, X, AlertCircle, Download } from "lucide-react"
import Link from "next/link"

export default function AttendancePage() {
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
        } else if (savedRole !== "parent" && savedRole !== "teacher") {
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
          <p className="text-gray-600">Loading attendance records...</p>
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
      attendance: {
        present: 98,
        absent: 2,
        late: 3,
        total: 103,
      },
      records: [
        { date: "June 10, 2025", status: "present", time: "8:45 AM" },
        { date: "June 9, 2025", status: "present", time: "8:50 AM" },
        { date: "June 8, 2025", status: "absent", time: "-", reason: "Sick leave" },
        { date: "June 7, 2025", status: "present", time: "8:40 AM" },
        { date: "June 6, 2025", status: "late", time: "9:15 AM", reason: "Traffic" },
        { date: "June 5, 2025", status: "present", time: "8:45 AM" },
        { date: "June 4, 2025", status: "present", time: "8:50 AM" },
      ],
    },
    {
      id: 2,
      name: "Arjun Singh",
      grade: "5",
      section: "B",
      attendance: {
        present: 95,
        absent: 5,
        late: 2,
        total: 102,
      },
      records: [
        { date: "June 10, 2025", status: "present", time: "8:40 AM" },
        { date: "June 9, 2025", status: "present", time: "8:45 AM" },
        { date: "June 8, 2025", status: "present", time: "8:50 AM" },
        { date: "June 7, 2025", status: "absent", time: "-", reason: "Family function" },
        { date: "June 6, 2025", status: "present", time: "8:45 AM" },
        { date: "June 5, 2025", status: "late", time: "9:10 AM", reason: "Bus delay" },
        { date: "June 4, 2025", status: "present", time: "8:40 AM" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "absent":
        return <X className="h-4 w-4 text-red-500" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Late</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Records</h1>
          <p className="text-gray-600 mt-2">Track your children's school attendance</p>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{child.name}</CardTitle>
                    <CardDescription>
                      Grade {child.grade} - Section {child.section}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Attendance Stats */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Present</p>
                    <p className="text-2xl font-bold text-green-600">{child.attendance.present}</p>
                    <p className="text-xs text-gray-500">days</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Absent</p>
                    <p className="text-2xl font-bold text-red-600">{child.attendance.absent}</p>
                    <p className="text-xs text-gray-500">days</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Late</p>
                    <p className="text-2xl font-bold text-yellow-600">{child.attendance.late}</p>
                    <p className="text-xs text-gray-500">days</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Percentage</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((child.attendance.present / child.attendance.total) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">attendance</p>
                  </div>
                </div>

                {/* Recent Attendance */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Recent Attendance</h3>
                  <div className="space-y-2">
                    {child.records.map((record, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-gray-100">{getStatusIcon(record.status)}</div>
                          <div>
                            <p className="text-sm font-medium">{record.date}</p>
                            <p className="text-xs text-gray-500">Check-in: {record.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(record.status)}
                          {record.reason && (
                            <div className="flex items-center text-xs text-gray-500">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {record.reason}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/messages?subject=Attendance&student=${child.name}`}>Report Absence</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/attendance/${child.id}`}>View Full History</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Attendance Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Policies</CardTitle>
            <CardDescription>Important information about school attendance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Reporting Absences</h4>
                <p className="text-sm text-gray-600">
                  Please report all absences before 8:30 AM through the messaging system or by calling the school
                  office.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Medical Certificates</h4>
                <p className="text-sm text-gray-600">
                  For absences of 3 or more consecutive days, a medical certificate is required upon return.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Attendance Requirements</h4>
                <p className="text-sm text-gray-600">
                  Students must maintain at least 85% attendance to be eligible for final examinations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
